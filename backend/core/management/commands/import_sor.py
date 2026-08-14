"""Import the Schedule of Rates from core/seed/sor.json into the database.
Idempotent: clears and reloads the SOR tables. Safe to run on every deploy."""
import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from core.models import SORCategory, SORTest

SEED = Path(__file__).resolve().parent.parent.parent / 'seed' / 'sor.json'


class Command(BaseCommand):
    help = 'Import the PTH Schedule of Rates from seed/sor.json'

    @transaction.atomic
    def handle(self, *args, **opts):
        if not SEED.exists():
            self.stderr.write(f'Seed file not found: {SEED}')
            return
        data = json.loads(SEED.read_text(encoding='utf-8'))
        SORTest.objects.all().delete()
        SORCategory.objects.all().delete()
        n_cat = n_test = 0
        for cat in data:
            c = SORCategory.objects.create(
                number=cat['id'], name=cat['name'], combos=cat.get('combos', []),
            )
            n_cat += 1
            for t in cat['tests']:
                rate = t.get('rate')
                SORTest.objects.create(
                    category=c, name=t['name'], code=t.get('code', ''),
                    qty=t.get('qty', ''),
                    rate=rate if isinstance(rate, (int, float)) else None,
                    rate_text=str(t.get('rateText', '')),
                )
                n_test += 1
        self.stdout.write(self.style.SUCCESS(
            f'Imported SOR: {n_cat} categories, {n_test} tests'))
