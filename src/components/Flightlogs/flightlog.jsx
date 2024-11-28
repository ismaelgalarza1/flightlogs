import React, { useState, useEffect } from "react";
import Card from "../UI/cards";
import Chart from "./chart";
import Styles from "./flightlog.module.css";

const FlightLog = (props) => {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({
    date: "",
    name: "",
    location: "",
    launch: "",
    land: "",
    aircraftType: "",
    aircraftNumber: "",
    totalHours: "",
    remarks: "",
  });

  useEffect(() => {
    const storedFlights = JSON.parse(localStorage.getItem("flights")) || [];
    setFlights(storedFlights);
  }, []);

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
      flightData.name &&
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
        name: "",
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
    <div className={Styles.main}>
      <Card className={Styles.flightCard}>
        <form onSubmit={handleSubmit}>
          <div className={Styles.inputSection} >
            <input
              type="date"
              name="date"
              value={flightData.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              value={flightData.name}
              onChange={handleChange}
              placeholder="Pilot's Name"
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
          </div>

          <div className="col-2">
            <input
            className={Styles.input}
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
          </div>
          <button type="submit">Submit</button>
        </form>
      </Card>

      <div className={Styles.flightLogged}>
        <h2>Flights Logged</h2>
        <Card className={Styles.card}>
          <ol type="1" className="flights">
            {flights.map((flight, index) => (
              <li key={index}>
                <p>Date {flight.date}</p>
                <p>Location {flight.location}</p>
                <p>Launch {flight.launch}</p>
                <p>Land {flight.land}</p>
                <p>Aircraft Type {flight.aircraftType}</p>
                <p>Aircraft Number {flight.aircraftNumber}</p>
                <p>Total Hours {flight.totalHours}</p>
                <p>Remarks {flight.remarks}</p>
                <div className="ButtonsList">
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className={Styles.chart}>
        <h2>Flight Chart</h2>
        <Card className={Styles.card}><Chart flights={flights} /></Card>
        
      </div>
    </div>
  );
};

export default FlightLog;
