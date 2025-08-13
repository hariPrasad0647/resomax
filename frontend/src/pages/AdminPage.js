import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL; // ✅ from .env

function AdminPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.tripName}</td>
              <td>{b.userName}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
