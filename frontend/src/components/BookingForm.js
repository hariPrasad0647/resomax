import React, { useState } from 'react';

function BookingForm({ trip, onBookingComplete, onCancel }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date) {
      setMessage({ text: 'Please enter your name and select a date.', type: 'error' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: trip.id,
          userName: name,
          date: date
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Show backend message
        setMessage({ text: data.message || 'Booking confirmed!', type: 'success' });
        setName('');
        setDate('');

        // Wait 2 seconds before calling onBookingComplete
        setTimeout(() => {
          setMessage({ text: '', type: '' });
          onBookingComplete();
        }, 2000);

      } else {
        setMessage({ text: data.error || data.message || 'Booking failed.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Server error. Please try again later.', type: 'error' });
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <h2>Book: {trip.title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Select Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '15px' }}>
          <button type="submit">Confirm Booking</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      </form>

      {message.text && (
        <p
          style={{
            marginTop: '10px',
            color: message.type === 'error' ? 'red' : 'green',
            fontWeight: 'bold'
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

export default BookingForm;
