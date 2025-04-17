from rest_framework import generics, permissions
from .models import SOSAlert
from .serializers import SOSAlertSerializer

class TriggerSOSAlertView(generics.CreateAPIView):
    serializer_class = SOSAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserSOSHistoryView(generics.ListAPIView):
    serializer_class = SOSAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SOSAlert.objects.filter(user=self.request.user).order_by('-timestamp')
