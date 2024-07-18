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
    image_path = models.CharField(max_length=100)
    car_year = models.IntegerField()
    brand = models.CharField(max_length=55)
    model = models.CharField(max_length=50)
    car_type = models.CharField(max_length=50)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
