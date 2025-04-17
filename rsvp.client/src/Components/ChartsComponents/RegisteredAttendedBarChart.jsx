import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RegisteredAttendedBarChart = ({ registered = 0, attended = 0 }) => {
  const data = {
    labels: ["Registered", "Attended"],
    datasets: [
      {
        label: "Participants",
        data: [registered, attended],
        backgroundColor: ["#0897FF", "#00C49F"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 40,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-md">
      <h2 className="text-lg font-medium text-primary-txt mb-4">Event Participation</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegisteredAttendedBarChart;
