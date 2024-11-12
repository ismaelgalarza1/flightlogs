import React, { useState, useEffect } from "react";

function FlightLog() {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({
    date: "",
    location: "",
    duration: "",
    purpose: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedFlights = JSON.parse(localStorage.getItem("flights")) || [];
    setFlights(storedFlights);
  }, []);

  // Save flights to localStorage whenever flights state changes
  useEffect(() => {
    localStorage.setItem("flights", JSON.stringify(flights));
  }, [flights]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      flightData.date &&
      flightData.location &&
      flightData.duration &&
      flightData.purpose
    ) {
      setFlights([...flights, flightData]);
      setFlightData({
        date: "",
        location: "",
        duration: "",
        purpose: "",
      });
    }
  };

  const handleDelete = (index) => {
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={flightData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={flightData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          name="duration"
          value={flightData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
        />
        <input
          type="text"
          name="purpose"
          value={flightData.purpose}
          onChange={handleChange}
          placeholder="Purpose"
          required
        />
        <button type="submit">Log Flight</button>
      </form>

      <h2>Logged Flights</h2>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Date: {flight.date}</p>
            <p>Location: {flight.location}</p>
            <p>Duration: {flight.duration} minutes</p>
            <p>Purpose: {flight.purpose}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightLog;
