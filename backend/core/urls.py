from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('branches', views.BranchViewSet)
router.register('leads', views.LeadViewSet)
router.register('credentials', views.CredentialViewSet)
router.register('equipment', views.EquipmentViewSet)
router.register('staff', views.StaffViewSet)
router.register('tenders', views.TenderViewSet)
router.register('approvals', views.ApprovalViewSet)
router.register('notifications', views.NotificationViewSet)
router.register('quotations', views.QuotationViewSet)
router.register('sor', views.SORCategoryViewSet)
router.register('audit', views.AuditEventViewSet)

urlpatterns = [
    # Auth
    path('auth/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/me/', views.me, name='me'),
    # Resources
    path('', include(router.urls)),
]
