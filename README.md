# Flight Booking App

This is a flight booking application built using **Python Django** for the backend and **React** for the frontend. The app allows users to search for flights, book tickets, and manage their bookings. The backend API is built with Django and Django REST Framework.

## Features

- **User Authentication**: Users can register, log in, and manage their profiles.
- **Flight Listings**: Browse and view available flights.
- **Ticket Booking**: Book tickets for specific flights and manage existing bookings.

## Models

1. **User**: Represents users with relevant information like username, email, and password. This model includes authentication and user profile management.
2. **Flight**: Contains details about each flight, such as departure and arrival locations, dates, and seat availability.
3. **Ticket**: Links users with specific flights, keeping track of booking information and status.

## Tech Stack

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: React
- **Database**: SQLite (for development)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/flight-booking-app.git
   cd flight-booking-app
