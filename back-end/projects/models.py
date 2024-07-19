from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    rut = models.CharField(max_length=10, unique=False)
    is_employee = models.BooleanField(default=False)

class CameraConfig(models.Model):
    camera1_url = models.CharField(max_length=255, default='')
    camera2_url = models.CharField(max_length=255, default='')
    camera3_url = models.CharField(max_length=255, default='')
    user = models.OneToOneField(CustomUser, related_name='camera_config', on_delete=models.CASCADE, default=None)

class CarPlates(models.Model):
    plate_number = models.CharField(max_length=10, unique=True)
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class WashStatus(models.Model):
    STATUS_CHOICES = [
        ('ENTERED', 'Entered'),
        ('WASHING', 'Washing'),
        ('FINISHED', 'Finished'),
        ('EXIT', 'Exit'),
    ]
    
    car_plate = models.ForeignKey(CarPlates, on_delete=models.CASCADE, related_name='wash_status')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ENTERED')
    updated_at = models.DateTimeField(auto_now=True)
