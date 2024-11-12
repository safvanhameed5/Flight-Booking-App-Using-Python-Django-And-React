from rest_framework import serializers
from .models import Flight, Ticket, User

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['id', 'flight_name', 'flight_number', 'source', 'destination', 'departure', 'arrival', 'duration', 'status']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'ticket_id', 'user', 'flight', 'price', 'seat_no', 'booked_time', 'travel_class']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'age', 'gender', 'phone_number', 'email']
