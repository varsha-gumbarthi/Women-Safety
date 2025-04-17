from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App Routes
    path('api/users/', include('users.urls')),
    path('api/sos/', include('sos.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/ai/', include('ai_module.urls')),
    path('api/drone/', include('drone.urls')),
]
