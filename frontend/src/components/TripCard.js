import React from 'react';

function TripCard({ trip, onSelect }) {
  return (
    <div className="trip-card">
      <img src={trip.image} alt={trip.title} className="trip-image" />
      <h3>{trip.title}</h3>
      <p>{trip.description}</p>
      <p><strong>Price:</strong> ${trip.price}</p>
      <p><strong>Duration:</strong> {trip.duration}</p>
      <button onClick={() => onSelect(trip)}>Book Now</button>
    </div>
  );
}

export default TripCard;

