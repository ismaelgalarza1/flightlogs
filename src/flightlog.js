import React, { useState, useEffect } from "react";

function FlightLog() {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({
    date: "",
    location: "",
    launch: "",
    land: "",
    aircraftType: "",
    aircraftNumber: "",
    totalHours: "",
    remarks: "",
  });

  // Load data from localStorage
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
      flightData.launch &&
      flightData.land &&
      flightData.aircraftType &&
      flightData.aircraftNumber &&
      flightData.totalHours &&
      flightData.remarks
    ) {
      setFlights([...flights, flightData]);
      setFlightData({
        date: "",
        location: "",
        launch: "",
        land: "",
        aircraftType: "",
        aircraftNumber: "",
        totalHours: "",
        remarks: "",
      });
    }
  };

  const handleDelete = (index) => {
    const updatedFlights = flights.filter((_, i) => i !== index);
    setFlights(updatedFlights);
  };

  const handleUpdate = (index) => {
    const flightToUpdate = flights[index];
    setFlightData(flightToUpdate);
    handleDelete(index);
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
          type="time"
          name="launch"
          value={flightData.launch}
          onChange={handleChange}
          placeholder="Launch Time"
          required
        />
        <input
          type="time"
          name="land"
          value={flightData.land}
          onChange={handleChange}
          placeholder="Land Time"
          required
        />
        <input
          type="text"
          name="aircraftType"
          value={flightData.aircraftType}
          onChange={handleChange}
          placeholder="Aircraft Type"
          required
        />
        <input
          type="number"
          name="aircraftNumber"
          value={flightData.aircraftNumber}
          onChange={handleChange}
          placeholder="Aircraft Number"
          required
        />
        <input
          type="number"
          name="totalHours"
          value={flightData.totalHours}
          onChange={handleChange}
          placeholder="Total Hours"
          required
        />
        <input
          type="text"
          name="remarks"
          value={flightData.remarks}
          onChange={handleChange}
          placeholder="Remarks"
        />
        <button type="submit">Log Flight</button>
      </form>
      {/* Added the 3rd button on adds the log and the other deletes or updates the log. */}
      <h2>Logged Flights</h2>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Date: {flight.date}</p>
            <p>Location: {flight.location}</p>
            <p>Launch: {flight.launch}</p>
            <p>Land: {flight.land}</p>
            <p>Aircraft Type: {flight.aircraftType}</p>
            <p>Aircraft Number: {flight.aircraftNumber}</p>
            <p>Total Hours: {flight.totalHours}</p>
            <p>Remarks: {flight.remarks}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleUpdate(index)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightLog;
