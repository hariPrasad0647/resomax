import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import BookingForm from '../components/BookingForm';

function HomePage() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [bookingMessage, setBookingMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/trips')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error(err));
  }, []);

  const handleBookingComplete = (message) => {
    setSelectedTrip(null); // Close form
    setBookingMessage({ text: message, type: 'success' });

    // Clear message after 5 seconds
    setTimeout(() => setBookingMessage({ text: '', type: '' }), 5000);
  };

  return (
    <div>
      <h1>Trip Plans</h1>

      {/* Show success message */}
      {bookingMessage.text && (
        <p
          style={{
            color: bookingMessage.type === 'error' ? 'red' : 'green',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}
        >
          {bookingMessage.text}
        </p>
      )}

      <div className="trip-list">
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} onSelect={setSelectedTrip} />
        ))}
      </div>

      {selectedTrip && (
        <BookingForm
          trip={selectedTrip}
          onBookingComplete={handleBookingComplete} // pass message up
          onCancel={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
}

export default HomePage;
