from django.urls import path
from .views import TriggerSOSAlertView, UserSOSHistoryView

urlpatterns = [
    path('trigger/', TriggerSOSAlertView.as_view(), name='sos-trigger'),
    path('history/', UserSOSHistoryView.as_view(), name='sos-history'),
]
