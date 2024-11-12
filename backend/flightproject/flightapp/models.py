

# Create your models here.
from django.db import models

class Flight(models.Model):
    flight_name = models.CharField(max_length=100)
    flight_number = models.CharField(max_length=10, unique=True)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure = models.DateTimeField()
    arrival = models.DateTimeField()
    duration = models.DurationField()
    STATUS_CHOICES = [('AVAILABLE', 'Available'), ('FULL', 'Full')]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

class Ticket(models.Model):
    ticket_id = models.CharField(max_length=20, unique=True)  # Unique identifier for each ticket
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seat_no = models.CharField(max_length=10)
    booked_time = models.DateTimeField(auto_now_add=True)
    CLASS_CHOICES = [('ECONOMY', 'Economy'), ('BUSINESS', 'Business'), ('PREMIUM', 'Premium')]
    travel_class = models.CharField(max_length=10, choices=CLASS_CHOICES)

class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
