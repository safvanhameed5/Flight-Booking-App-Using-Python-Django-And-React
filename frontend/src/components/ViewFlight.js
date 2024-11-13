import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewFlight.css";
import Seat from "./Seat";
import { MyContext } from "./MyContext";
import { MdFlight } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa6";

const ViewFlight = () => {
  const { id } = useParams();

  const [travellers, setTravellers] = useState(0);

  const [seats, setSeats] = useState([]);

  const [price, setPrice] = useState(0);

  const [flight, setFlight] = useState({});

  const taxPercent = 5;
  const taxesAndFees = (price * taxPercent) / 100;
  const baseFare = price - taxesAndFees;


  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    axios
      .get(`http://127.0.0.1:8000/api/flights/${id}/`)
      .then((response) => {
        console.log(response.data);
        setFlight(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  };

  const dateObj = new Date(flight.departure);

  const formattedDeparture = dateObj.toLocaleDateString("en-GB", {
    weekday: "short", // "Tue"
    day: "2-digit", // "29"
    month: "short", // "Oct"
  });

  const dateObjArr = new Date(flight.arrival);

  const formattedArrival = dateObjArr.toLocaleDateString("en-GB", {
    weekday: "short", // "Tue"
    day: "2-digit", // "29"
    month: "short", // "Oct"
  });

  const formatDuration = (duration) => {
    if (!duration) return "N/A"; // Return placeholder if duration is undefined
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="outer">
      <div className="price-container">
      <div className="price">
        <div className="one">
          <div className="fare-summary"><strong>Fare Summary</strong></div>
          <div className="shade">{travellers} Traveller</div>
        </div>
        <div className="two">
          <div>Fare Type</div>
          <div className="refund-text">Partially Refundable</div>
        </div>
        <div className="three">
          <div>Base Fare</div>
          <div className="sub-price">₹{baseFare}</div>
        </div>
        <div className="four">
          <div>Taxes & Fees</div>
          <div className="sub-price">₹{taxesAndFees}</div>
        </div>
        <div className="four-two">
          <div>Seats </div>
          <div className="sub-price">{seats}</div>
        </div>
        <hr style={{ border: '0', height: '2px', backgroundColor: '#f8f8f8', margin: '10px 0' }}/>
        <div className="five">
          <div className="main-price"><strong>Total Amount</strong></div>
          <div className="main-price"><strong>₹{price}</strong></div>
        </div>
        </div>
      </div>
      <div className="main-div">
        <div className="route">
          <strong>
            {flight.source} 🡪 {flight.destination}
          </strong>
        </div>
        <div>
          <small>
            <strong>
              {formattedDeparture} • Non-stop •{" "}
              {formatDuration(flight.duration)}
            </strong>
          </small>
        </div>
        <div className="flight-title">
          {flight.flight_name} | {flight.flight_number} <MdFlight className="flight-icon" />
        </div>
        <div className="contain">
          <div className="left">
            <div className="shade">
              <small>{formattedDeparture}</small>
            </div>
            <strong>{formatTime(flight.departure)}</strong>
            <small>{flight.source}</small>
          </div>
          <div className="center">
            <div className="shade">
              <small>{formatDuration(flight.duration)}</small>
              <div className="route-icon"><TbArrowsExchange /></div>
            </div>
          </div>
          <div className="right">
            <div className="shade">
              <small>{formattedArrival}</small>
            </div>
            <strong>{formatTime(flight.arrival)}</strong>
            <small>{flight.destination}</small>
          </div>
        </div>
        <hr style={{ border: '0', height: '2px', backgroundColor: '#f8f8f8', margin: '0 0' }}/>
        <MyContext.Provider value={{travellers, price, seats}}>
          <Seat setTravellers={setTravellers} setPrice={setPrice} setSeats={setSeats} />
          {/* Pass setTravellers as prop */}
        </MyContext.Provider>
      </div>
      <div className="offers">
        <div className="off-1">
          <div><strong>Baggage</strong></div>
          <div className="shade">Per Traveller</div>
        </div>
        <div className="off-2">
          <div><strong>Flexibility</strong></div>
          <div><small>Cancellation fees apply</small></div>
        </div>
        <div className="off-3">
          <div><strong>Seats, Meals & More</strong></div>
          <div><small>Complimentary</small></div>
        </div>
        <hr style={{ border: '0', height: '2px', backgroundColor: '#f8f8f8', margin: '10px 0' }}/>
      </div>
      <div className="footer">
        <div className="foot-price"><strong>₹{price}</strong></div>
        <div className="foot-btn"><button className="btn-confirm"><div className="btn-text">Continue <FaAngleRight className="continue-right" /></div></button></div>
      </div>
    </div>
  );
};

export default ViewFlight;
