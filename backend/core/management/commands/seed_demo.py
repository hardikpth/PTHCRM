"""Seed the PTH CRM workspace with the five users, branches and a little
sample data. Idempotent (get_or_create), so it is safe to run on every deploy.
Also imports the Schedule of Rates. Passwords are supplied through environment
variables and are never stored in source control."""
import os

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import BaseCommand

from core.models import Branch, Approval, Notification

User = get_user_model()

BRANCHES = ['Surat (HO)', 'Ahmedabad', 'Vadodara', 'Rajkot', 'Mumbai']

USERS = [
    ('hardik',  'Hardik',  'Laboratory Head',      'Surat (HO)'),
    ('tushal',  'Tushal',  'Quality Manager',      'Surat (HO)'),
    ('shivang', 'Shivang', 'Technical Manager',    'Ahmedabad'),
    ('jaydeep', 'Jaydeep', 'CRM Manager',          'Surat (HO)'),
    ('nirav',   'Nirav',   'Authorised Signatory', 'Vadodara'),
]

APPROVALS = [
    ('NABL Accreditation', 'National Accreditation Board (NABL)', 'TC-8421', 'valid', 100),
    ('ISO/IEC 17025:2017', 'NABL / ILAC', 'ISO-17025-2291', 'valid', 100),
    ('ISO 9001:2015', 'Bureau Veritas', 'QMS-55190', 'expiring', 45),
]


class Command(BaseCommand):
    help = 'Seed users, branches, sample data and import the SOR'

    def handle(self, *args, **opts):
        demo_password = os.getenv('DEMO_USER_PASSWORD')
        if not demo_password:
            raise RuntimeError('DEMO_USER_PASSWORD must be set before seeding users')

        for b in BRANCHES:
            Branch.objects.get_or_create(name=b)

        for username, name, role, branch in USERS:
            user, created = User.objects.get_or_create(
                username=username,
                defaults=dict(name=name, email=f'{username}@pramukhtesthouse.com',
                              role=role, branch=branch, status='active'),
            )
            if created:
                user.set_password(demo_password)
                user.save()
                self.stdout.write(f'  + user {username}')

        # Superuser for the Django admin
        su_user = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
        su_pass = os.getenv('DJANGO_SUPERUSER_PASSWORD')
        if not su_pass:
            raise RuntimeError('DJANGO_SUPERUSER_PASSWORD must be set before seeding users')
        if not User.objects.filter(username=su_user).exists():
            User.objects.create_superuser(
                username=su_user, email='admin@pramukhtesthouse.com', password=su_pass,
                name='Administrator', role='Super Admin', branch='Surat (HO)', status='active',
            )
            self.stdout.write(f'  + superuser {su_user}')

        for name, auth, cert, status, prog in APPROVALS:
            Approval.objects.get_or_create(
                name=name, defaults=dict(authority=auth, cert=cert, status=status, progress=prog))

        Notification.objects.get_or_create(
            title='Welcome to PTH CRM',
            defaults=dict(text='Your multi-user workspace is live.', tone='info'))

        # Reference data
        call_command('import_sor')

        self.stdout.write(self.style.SUCCESS('Seed complete.'))
