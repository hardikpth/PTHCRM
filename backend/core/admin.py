from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    User, Branch, Lead, Credential, Equipment, Staff, Tender, Approval,
    Notification, Quotation, QuotationItem, SORCategory, SORTest, AuditEvent,
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'name', 'role', 'branch', 'status', 'is_staff')
    list_filter = ('role', 'status', 'branch', 'is_staff')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('PTH profile', {'fields': ('name', 'role', 'branch', 'status', 'initials')}),
    )


class QuotationItemInline(admin.TabularInline):
    model = QuotationItem
    extra = 0


@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ('number', 'customer', 'total', 'status', 'created_by')
    inlines = [QuotationItemInline]


class SORTestInline(admin.TabularInline):
    model = SORTest
    extra = 0


@admin.register(SORCategory)
class SORCategoryAdmin(admin.ModelAdmin):
    list_display = ('number', 'name')
    inlines = [SORTestInline]


@admin.register(AuditEvent)
class AuditEventAdmin(admin.ModelAdmin):
    list_display = ('ts', 'user', 'action', 'module', 'detail')
    list_filter = ('action', 'module')
    search_fields = ('user', 'detail')


for m in (Branch, Lead, Credential, Equipment, Staff, Tender, Approval, Notification):
    admin.site.register(m)
