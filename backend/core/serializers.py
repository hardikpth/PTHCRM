from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Branch, Lead, Credential, Equipment, Staff, Tender, Approval,
    Notification, Quotation, QuotationItem, SORCategory, SORTest, AuditEvent,
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, allow_blank=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'role', 'branch',
                  'status', 'initials', 'last_login', 'password']
        read_only_fields = ['last_login']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for k, v in validated_data.items():
            setattr(instance, k, v)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Return the user profile alongside the JWT pair."""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'


class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        fields = '__all__'


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'


class ApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approval
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class QuotationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuotationItem
        fields = ['id', 'name', 'code', 'qty', 'rate']


class QuotationSerializer(serializers.ModelSerializer):
    lines = QuotationItemSerializer(many=True, required=False)

    class Meta:
        model = Quotation
        fields = '__all__'

    def create(self, validated_data):
        lines = validated_data.pop('lines', [])
        quotation = Quotation.objects.create(**validated_data)
        for line in lines:
            QuotationItem.objects.create(quotation=quotation, **line)
        return quotation

    def update(self, instance, validated_data):
        lines = validated_data.pop('lines', None)
        for k, v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        if lines is not None:
            instance.lines.all().delete()
            for line in lines:
                QuotationItem.objects.create(quotation=instance, **line)
        return instance


class SORTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SORTest
        fields = ['id', 'name', 'code', 'qty', 'rate', 'rate_text']


class SORCategorySerializer(serializers.ModelSerializer):
    tests = SORTestSerializer(many=True, read_only=True)

    class Meta:
        model = SORCategory
        fields = ['id', 'number', 'name', 'combos', 'tests']


class AuditEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditEvent
        fields = '__all__'
        read_only_fields = ['ts']
