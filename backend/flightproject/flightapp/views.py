from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Flight, Ticket, User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import FlightSerializer, TicketSerializer, UserSerializer

# Create your views here.
@api_view(['GET', 'POST'])
def flight_list(request):
    if request.method == 'GET':
        flights = Flight.objects.all()
        serializer = FlightSerializer(flights, many=True)
        
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
    
@api_view(['GET', 'PUT', 'DELETE'])

def flight_detail(request, flight_number):
    try:
        flight = Flight.objects.get(id=flight_number)
    except Flight.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve the flight details
        serializer = FlightSerializer(flight)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Update the flight details
        serializer = FlightSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete the flight
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')  # Get the username from the request
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate inputs
    if not username or not email or not password:
        return Response({'error': 'Username, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username or email is already registered
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)