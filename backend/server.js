import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Hardcoded trips with image URLs
const trips = [
  {
    id: "t1",
    title: "Beach Escape",
    description: "Sun, sand, and seafood — a chilled weekend by the coast.",
    price: 4999,
    durationDays: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: "t2",
    title: "Hill Station Retreat",
    description: "Cool breeze, tea gardens, and scenic hikes.",
    price: 7999,
    durationDays: 3,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    id: "t3",
    title: "Desert Safari",
    description: "Camel rides, dunes, and a starry night in the desert.",
    price: 5999,
    durationDays: 2,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    id: "t4",
    title: "City Lights Tour",
    description: "Experience nightlife, skyscrapers, and the urban vibe.",
    price: 6999,
    durationDays: 2,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b"
  },
  {
    id: "t5",
    title: "Rainforest Adventure",
    description: "Wildlife, waterfalls, and lush greenery all around.",
    price: 8999,
    durationDays: 4,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  }
];

// In-memory bookings
const bookings = [];

// Get all trips
app.get("/api/trips", (req, res) => {
  res.json(trips);
});

// Check availability
app.post("/api/check-availability", (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "Date required" });

  const bookingsForDate = bookings.filter(b => b.date === date);
  const available = bookingsForDate.length < 5;

  res.json({ available });
});

// Book a trip
app.post("/api/book", (req, res) => {
  const { tripId, userName, date } = req.body;

  if (!tripId || !userName || !date) {
    return res.status(400).json({ error: "tripId, userName, and date required" });
  }

  const bookingsForDate = bookings.filter(b => b.date === date);
  if (bookingsForDate.length >= 5) {
    return res.status(400).json({ error: "No vans available for the selected date." });
  }

  const trip = trips.find(t => t.id === tripId);
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const booking = {
    id: nanoid(),
    tripId,
    tripName: trip.title,
    userName,
    date,
    status: "Confirmed"
  };
  bookings.push(booking);

  res.json({ message: "Booking confirmed", booking });
});

// Admin — get all bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
