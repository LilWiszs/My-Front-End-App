import { useState } from "react";

export function useDeviceHandlers() {
  const [devices, setDevices] = useState([
    { id: 1, name: "Temperature Sensor A", type: "Temperature", location: "Room 1", status: "online", lastUpdate: "2:30 PM", reason: "" },
    { id: 2, name: "Blood Pressure Monitor", type: "BP Monitor", location: "Room 2", status: "online", lastUpdate: "2:28 PM", reason: "" },
    { id: 3, name: "Pulse Oximeter", type: "Oxygen", location: "Room 3", status: "offline", lastUpdate: "1:45 PM", reason: "WiFi connection lost" },
    { id: 4, name: "Weight Scale", type: "Scale", location: "Waiting Area", status: "online", lastUpdate: "2:25 PM", reason: "" }
  ]);
  const [deviceUptimeMetrics, setDeviceUptimeMetrics] = useState({
    daily: { "Temperature Sensor A": 99.8, "Blood Pressure Monitor": 99.5, "Pulse Oximeter": 85.2, "Weight Scale": 100 },
    weekly: { "Temperature Sensor A": 98.5, "Blood Pressure Monitor": 96.8, "Pulse Oximeter": 80.3, "Weight Scale": 99.2 },
    monthly: { "Temperature Sensor A": 97.2, "Blood Pressure Monitor": 95.5, "Pulse Oximeter": 78.6, "Weight Scale": 98.8 }
  });

  return {
    devices,
    deviceUptimeMetrics
  };
}
