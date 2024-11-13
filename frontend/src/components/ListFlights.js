import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ListFlights.css'
import { MdFlight } from 'react-icons/md';
import { FaLocationDot } from "react-icons/fa6";

const ListFlights = () => {
  const [flights, setFlights] = useState({
    available_flights: [],
    full_flights: [],
    complete_flights: []
  });


  useEffect(() => {
    fetchFlights();
  }, []);

  const navigate = useNavigate();

  const viewFlights = (id) => {
    navigate("/viewFlights/" + id);
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', });
  };

  const formatDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return `${hours}h ${minutes}m`;
};

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/flights/');
      setFlights(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div className='list-main'>
      <h2 className='title'>Airlines</h2>
      {flights.complete_flights.map((flight) => (
        <div key={flight.id} className="flight-card">
            <div className='section-a'>
            <strong>{flight.flight_name}</strong>
            <div className='shade'>{flight.flight_number}<MdFlight className="flight-icon" /></div>
            </div>
            <div className='section-b'>
            <strong>{formatTime(flight.departure)}</strong>
            <div className='shade'>{flight.source}<FaLocationDot className='loc-icon' /></div>
            </div>
            <div className='section-c'>
            <div className='shade'><small>{flight.duration}</small></div>
            <div className='shade'><small>Non-stop</small></div>
            </div>
            <div className='section-d'>
            <strong>{formatTime(flight.arrival)}</strong>
            <div className='shade'>{flight.destination}<FaLocationDot className='loc-icon' /></div>
            </div>
            <div className='right-side'>
            {flight.status === 'AVAILABLE' ? (
              <button onClick={() => viewFlights(flight.id)} className='btn'>Book Now</button>
            ) : (
              <button className='soldout'>Sold Out</button>
            )}
            </div>
        </div>
      ))}
    </div>
  );
};

export default ListFlights;
