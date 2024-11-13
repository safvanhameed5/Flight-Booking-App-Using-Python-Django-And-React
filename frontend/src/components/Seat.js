import React, { useState, useEffect } from 'react';
import './Seat.css';

const Seat = ({ setTravellers, setPrice, setSeats }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(5999); // Default to Economy class
    const [total, setTotal] = useState(0);

    // Update total price based on selected seats and ticket price
    useEffect(() => {
        setTotal(selectedSeats.length * ticketPrice);
        setTravellers(selectedSeats.length);
        setPrice(selectedSeats.length * ticketPrice)
        setSeats(selectedSeats)
        console.log("Selected Seats:", selectedSeats);
    }, [selectedSeats, ticketPrice]);

    const handleSeatClick = (e) => {
        const seat = e.target;
        if (seat.classList.contains('seat') && !seat.classList.contains('booked')) {
            seat.classList.toggle('selected');
            const seatId = seat.dataset.id; // Use data attribute to identify seat
            setSelectedSeats((prev) =>
                prev.includes(seatId) 
                    ? prev.filter((id) => id !== seatId) 
                    : [...prev, seatId]
            );
        }
    };

    const handleClassChange = (e) => {
        setTicketPrice(+e.target.value);
    };

    return (
        <div>
            <div className='class-container'>
                <label><strong>Class</strong></label>
                <select id="class" onChange={handleClassChange}>
                    <option value="5999">Economy (₹5999)</option>
                    <option value="9999">Premium (₹9999)</option>
                    <option value="14999">Business (₹14999)</option>
                </select>
            </div>
            <div className='seat-main'>
                <div className='seat-info'>
                    <ul className='showcase'>
                        <li>
                            <div className='seat'></div>
                            <small>N/A</small>
                        </li>
                        <li>
                            <div className='seat selected'></div>
                            <small>Selected</small>
                        </li>
                        <li>
                            <div className='seat booked'></div>
                            <small>Booked</small>
                        </li>
                    </ul>
                </div>
                <div className='container' onClick={handleSeatClick}>
                    {/* Generating 7 rows with 10 seats each */}
                    {[...Array(3)].map((_, rowIndex) => (
                        <div className='row' key={rowIndex}>
                            {[...Array(10)].map((_, seatIndex) => {
                                const seatId = `S${rowIndex * 10 + seatIndex + 1}`;
                                return (
                                    <div>
                                <div
                                    key={seatIndex} 
                                    className='seat' 
                                    data-id={`S${rowIndex * 10 + seatIndex + 1}`}
                                >
                                </div>
                                <div><span className='seat-id'>{seatId}</span></div>
                                </div>
                                
                            )})}
                            {/* Example of a booked seat for every row */}
                            <div>
                            <div className='seat booked' data-id={`S${rowIndex * 10 + 11}`}></div>
                            <div><span className='seat-id-booked'>{`S${rowIndex * 10 + 11}`}</span></div>
                        </div>
                        </div>
                    ))}
                </div>
                <p className='text'>
                    {console.log(selectedSeats.length)}
                    You have selected <span id="count">{selectedSeats.length}</span> Seats for a price of <span id="total">₹{total}</span>
                </p>
            </div>
        </div>
    );
}

export default Seat;
