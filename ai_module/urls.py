from django.urls import path
from .views import ValidateVoiceInputView

urlpatterns = [
    path('validate-voice/', ValidateVoiceInputView.as_view(), name='validate-voice'),
]
