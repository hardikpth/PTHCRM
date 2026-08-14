from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import (
    Branch, Lead, Credential, Equipment, Staff, Tender, Approval,
    Notification, Quotation, SORCategory, AuditEvent,
)
from .permissions import IsAdminRole
from .serializers import (
    UserSerializer, MyTokenObtainPairSerializer, BranchSerializer, LeadSerializer,
    CredentialSerializer, EquipmentSerializer, StaffSerializer, TenderSerializer,
    ApprovalSerializer, NotificationSerializer, QuotationSerializer,
    SORCategorySerializer, AuditEventSerializer,
)

User = get_user_model()


def write_audit(request, action, module, detail):
    u = request.user
    AuditEvent.objects.create(
        user=getattr(u, 'name', '') or getattr(u, 'username', ''),
        role=getattr(u, 'role', ''), action=action, module=module, detail=detail,
    )


class AuditedModelViewSet(viewsets.ModelViewSet):
    """ModelViewSet that records create/update/delete into the audit trail."""
    audit_module = 'General'

    def perform_create(self, serializer):
        obj = serializer.save()
        write_audit(self.request, 'Create', self.audit_module, f'Created {obj}')

    def perform_update(self, serializer):
        obj = serializer.save()
        write_audit(self.request, 'Edit', self.audit_module, f'Updated {obj}')

    def perform_destroy(self, instance):
        label = str(instance)
        instance.delete()
        write_audit(self.request, 'Delete', self.audit_module, f'Deleted {label}')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            u = response.data.get('user', {})
            AuditEvent.objects.create(
                user=u.get('name') or u.get('username', ''), role=u.get('role', ''),
                action='Login', module='Auth', detail='Signed in',
            )
        return response


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)


class UserViewSet(AuditedModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [IsAdminRole]
    audit_module = 'User Management'
    filterset_fields = ['role', 'status', 'branch']
    search_fields = ['name', 'username', 'email', 'role']


class BranchViewSet(AuditedModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    audit_module = 'Branches'


class LeadViewSet(AuditedModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    audit_module = 'CRM Pipeline'
    filterset_fields = ['stage', 'category', 'priority']
    search_fields = ['code', 'customer', 'project', 'person']


class CredentialViewSet(AuditedModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = CredentialSerializer
    audit_module = 'Credentials'
    filterset_fields = ['category', 'status', 'branch']
    search_fields = ['code', 'name', 'authority', 'cert_no']


class EquipmentViewSet(AuditedModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    audit_module = 'Equipment'
    search_fields = ['code', 'name', 'make']


class StaffViewSet(AuditedModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    audit_module = 'Staff'
    search_fields = ['name', 'role', 'qualification']


class TenderViewSet(AuditedModelViewSet):
    queryset = Tender.objects.all()
    serializer_class = TenderSerializer
    audit_module = 'Tenders'
    search_fields = ['code', 'title', 'client']


class ApprovalViewSet(AuditedModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer
    audit_module = 'Approvals'
    search_fields = ['name', 'authority', 'cert']


class NotificationViewSet(AuditedModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    audit_module = 'Alerts'


class QuotationViewSet(AuditedModelViewSet):
    queryset = Quotation.objects.prefetch_related('lines').all()
    serializer_class = QuotationSerializer
    audit_module = 'Quotations'
    search_fields = ['number', 'customer']


class SORCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Schedule of Rates is reference data — read-only over the API."""
    queryset = SORCategory.objects.prefetch_related('tests').all()
    serializer_class = SORCategorySerializer
    pagination_class = None


class AuditEventViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Audit trail is append-only: list + create, never edit/delete."""
    queryset = AuditEvent.objects.all()
    serializer_class = AuditEventSerializer
    filterset_fields = ['action', 'module', 'user']
    search_fields = ['user', 'action', 'module', 'detail']
