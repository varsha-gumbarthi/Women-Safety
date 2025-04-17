from django.urls import path
from .views import DispatchDroneView

urlpatterns = [
    path('dispatch/', DispatchDroneView.as_view(), name='drone-dispatch'),
]
