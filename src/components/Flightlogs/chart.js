import React, { useState } from "react";
// inport the chartjs-2 library for the graph.
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ flights }) => {
  const [selectedPilot, setSelectedPilot] = useState("");

  const pilots = [...new Set(flights.map((flight) => flight.name))];

  const filteredFlights = selectedPilot
    ? flights.filter((flight) => flight.name === selectedPilot)
    : flights;

  // Prepare data for the chart
  const data = {
    labels: filteredFlights.map((flight) => flight.aircraftType),
    datasets: [
      {
        // changing the color later for dark mode
        label: "Total Hours",
        data: filteredFlights.map((flight) => parseFloat(flight.totalHours)),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <div>
        <label htmlFor="pilotFilter">Filter by Pilot:</label>
        <select
          id="pilotFilter"
          value={selectedPilot}
          onChange={(e) => setSelectedPilot(e.target.value)}>
          <option value="">All Pilots</option>
          {pilots.map((pilot, index) => (
            <option key={index} value={pilot}>
              {pilot}
            </option>
          ))}
        </select>
      </div>
      <Line data={data} />
    </div>
  );
};

export default Chart;
