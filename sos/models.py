from django.db import models
from django.conf import settings

class SOSAlert(models.Model):
    THREAT_LEVEL_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sos_alerts')
    timestamp = models.DateTimeField(auto_now_add=True)
    location_lat = models.FloatField()
    location_long = models.FloatField()
    threat_level = models.CharField(max_length=10, choices=THREAT_LEVEL_CHOICES, default='LOW')
    verified_by_ai = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    drone_video_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} - {self.threat_level} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
