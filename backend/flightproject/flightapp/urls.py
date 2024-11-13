from django.urls import path
from . import views

urlpatterns = [
    path('flights/', views.flight_list, name='flight_list'),
    path('flights/<int:flight_number>/', views.flight_detail, name='flight_detail'),
]
