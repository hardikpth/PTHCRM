"""
PTH CRM data model.
Mirrors the front-end Store collections so the SPA can move from
localStorage to this shared, multi-user API with minimal change.
All authenticated PTH staff share one workspace (one lab); role-based
permissions gate what each user may do. The AuditEvent model records who
did what.
"""
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

ROLES = [
    'Super Admin', 'Director', 'Laboratory Head', 'Quality Manager',
    'Technical Manager', 'CRM Manager', 'Sales Executive', 'Tender Executive',
    'Document Controller', 'Accounts Manager', 'Testing Engineer', 'Reviewer',
    'Authorised Signatory', 'Technician', 'Customer Portal User',
]
ROLE_CHOICES = [(r, r) for r in ROLES]
STATUS_CHOICES = [('active', 'Active'), ('disabled', 'Disabled')]


class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Branch(TimeStamped):
    name = models.CharField(max_length=120, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class User(AbstractUser):
    """Custom user: username + password auth, plus lab-specific fields.
    `status` mirrors Django's `is_active` so disabled users cannot obtain a JWT."""
    name = models.CharField(max_length=120, blank=True, default='')
    role = models.CharField(max_length=60, choices=ROLE_CHOICES, default='Technician')
    branch = models.CharField(max_length=120, blank=True, default='')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    initials = models.CharField(max_length=4, blank=True, default='')

    def save(self, *args, **kwargs):
        self.is_active = (self.status == 'active')
        if not self.name:
            self.name = (self.get_full_name() or self.username).strip()
        if not self.initials and self.name:
            self.initials = ''.join(w[0] for w in self.name.split()[:2]).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name or self.username} ({self.role})'


class Lead(TimeStamped):
    """CRM pipeline lead / enquiry."""
    code = models.CharField(max_length=30, unique=True)
    customer = models.CharField(max_length=200)
    project = models.CharField(max_length=200, blank=True, default='')
    category = models.CharField(max_length=80, blank=True, default='')
    value = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    person = models.CharField(max_length=120, blank=True, default='')
    follow_up = models.DateField(null=True, blank=True)
    probability = models.PositiveIntegerField(default=0)
    priority = models.CharField(max_length=10, default='med')
    stage = models.CharField(max_length=30, default='new')  # pipeline column id

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.code} · {self.customer}'


class Credential(TimeStamped):
    code = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=120, blank=True, default='')
    authority = models.CharField(max_length=200, blank=True, default='')
    cert_no = models.CharField(max_length=120, blank=True, default='')
    branch = models.CharField(max_length=120, blank=True, default='')
    issue_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    responsible = models.CharField(max_length=120, blank=True, default='')
    status = models.CharField(max_length=20, default='valid')
    verification = models.CharField(max_length=20, default='verified')

    class Meta:
        ordering = ['expiry_date']

    def __str__(self):
        return self.name


class Equipment(TimeStamped):
    code = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=200)
    make = models.CharField(max_length=120, blank=True, default='')
    last_calibration = models.DateField(null=True, blank=True)
    next_due = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='valid')

    class Meta:
        ordering = ['next_due']

    def __str__(self):
        return self.name


class Staff(TimeStamped):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, blank=True, default='')
    qualification = models.CharField(max_length=200, blank=True, default='')
    cert = models.CharField(max_length=120, blank=True, default='')
    expiry = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='valid')

    class Meta:
        verbose_name_plural = 'Staff'
        ordering = ['name']

    def __str__(self):
        return self.name


class Tender(TimeStamped):
    code = models.CharField(max_length=40, unique=True)
    title = models.CharField(max_length=250)
    client = models.CharField(max_length=200, blank=True, default='')
    value = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    due = models.DateField(null=True, blank=True)
    stage = models.CharField(max_length=60, default='Requirement Identified')
    docs = models.PositiveIntegerField(default=0)
    missing = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['due']

    def __str__(self):
        return self.title


class Approval(TimeStamped):
    name = models.CharField(max_length=200)
    authority = models.CharField(max_length=200, blank=True, default='')
    category = models.CharField(max_length=120, blank=True, default='')
    cert = models.CharField(max_length=120, blank=True, default='')
    expiry = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='valid')
    progress = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Notification(TimeStamped):
    title = models.CharField(max_length=200)
    text = models.TextField(blank=True, default='')
    tone = models.CharField(max_length=20, default='info')
    unread = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Quotation(TimeStamped):
    number = models.CharField(max_length=40, unique=True)
    customer = models.CharField(max_length=200, blank=True, default='')
    date = models.DateField(null=True, blank=True)
    subtotal = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    status = models.CharField(max_length=20, default='submitted')
    created_by = models.CharField(max_length=120, blank=True, default='')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.number


class QuotationItem(models.Model):
    quotation = models.ForeignKey(Quotation, related_name='lines', on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=120, blank=True, default='')
    qty = models.PositiveIntegerField(default=1)
    rate = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class SORCategory(models.Model):
    number = models.PositiveIntegerField()
    name = models.CharField(max_length=250)
    combos = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['number']
        verbose_name = 'SOR category'
        verbose_name_plural = 'SOR categories'

    def __str__(self):
        return f'{self.number}. {self.name}'


class SORTest(models.Model):
    category = models.ForeignKey(SORCategory, related_name='tests', on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    code = models.CharField(max_length=120, blank=True, default='')
    qty = models.CharField(max_length=60, blank=True, default='')
    rate = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    rate_text = models.CharField(max_length=60, blank=True, default='')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class AuditEvent(models.Model):
    ts = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=120, blank=True, default='')
    role = models.CharField(max_length=80, blank=True, default='')
    action = models.CharField(max_length=40)
    module = models.CharField(max_length=60)
    detail = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['-ts']

    def __str__(self):
        return f'{self.ts:%Y-%m-%d %H:%M} {self.user} {self.action} {self.module}'
