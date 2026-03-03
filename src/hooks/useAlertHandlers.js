import { useState } from "react";

export function useAlertHandlers(addNotification) {
  const [alertHistory, setAlertHistory] = useState([
    { id: 1, type: "vital", severity: "warning", message: "High pulse rate detected (115 bpm)", timestamp: "2:30 PM", resolved: false },
    { id: 2, type: "device", severity: "info", message: "Pulse Oximeter offline", timestamp: "1:45 PM", resolved: true },
    { id: 3, type: "vital", severity: "normal", message: "Temperature reading normal", timestamp: "12:10 PM", resolved: true }
  ]);
  const [reportPeriod, setReportPeriod] = useState("daily");

  const handleResolveAlert = (alertId) => {
    setAlertHistory(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    addNotification("Alert resolved");
  };

  const handleClearAllAlerts = () => {
    setAlertHistory(prev => prev.map(alert => ({ ...alert, resolved: true })));
    addNotification("All alerts marked as resolved");
  };

  return {
    alertHistory,
    reportPeriod,
    setReportPeriod,
    handleResolveAlert,
    handleClearAllAlerts
  };
}
