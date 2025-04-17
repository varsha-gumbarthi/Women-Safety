from rest_framework import serializers
from .models import SOSAlert

class SOSAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSAlert
        fields = '__all__'
        read_only_fields = ('user', 'timestamp', 'verified_by_ai', 'is_active')
