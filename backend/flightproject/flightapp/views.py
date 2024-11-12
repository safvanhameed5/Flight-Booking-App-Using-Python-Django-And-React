from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Flight, Ticket, User
from .serializers import FlightSerializer, TicketSerializer, UserSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def flight_list(request):
    if request.method == 'GET':
        # Retrieve all flights, regardless of status
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)
        
        # Group flights by status in the JSON response
        available_flights = [flight for flight in serializer.data if flight['status'] == 'AVAILABLE']
        full_flights = [flight for flight in serializer.data if flight['status'] == 'FULL']
        complete_flights = serializer.data
        
        response_data = {
            'available_flights': available_flights,
            'full_flights': full_flights,
            'complete_flights': complete_flights,
        }
        
        return Response(response_data)
    
    elif request.method == 'POST':
        # Create a new flight
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)