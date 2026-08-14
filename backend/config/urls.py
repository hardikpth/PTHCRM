from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include


def health(_request):
    return JsonResponse({'status': 'ok', 'service': 'PTH CRM API'})


urlpatterns = [
    path('', health),
    path('healthz', health),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
