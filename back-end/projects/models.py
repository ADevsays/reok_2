from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    rut = models.CharField(max_length=10, unique=True)
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

class Timer(models.Model):
    time = models.IntegerField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class Queue(models.Model):
    orders = models.ManyToManyField(Order, related_name='queues')

    def enqueue(self, order: Order):
        """ Add an order to the queue """
        self.orders.add(order)

    def dequeue(self):
        """ Remove the next order from the queue """
        next_order = self.orders.order_by('created_at').first()
        if next_order:
            self.orders.remove(next_order)
            return next_order
        return None