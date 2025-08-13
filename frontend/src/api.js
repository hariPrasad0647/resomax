const API_URL = process.env.REACT_APP_API_URL;

export const getTrips = async () => {
  const res = await fetch(`${API_URL}/api/trips`);
  if (!res.ok) throw new Error("Failed to fetch trips");
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API_URL}/api/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
};

export const checkAvailability = async (tripId, date) => {
  const res = await fetch(`${API_URL}/api/check-availability/${tripId}?date=${date}`);
  if (!res.ok) throw new Error("Failed to check availability");
  return res.json();
};
