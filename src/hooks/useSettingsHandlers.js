import { useState } from "react";

export function useSettingsHandlers(addNotification) {
  const [systemSettings, setSystemSettings] = useState({
    darkMode: false,
    soundNotifications: true,
    maxQueueSize: 50,
    workingHours: "08:00-17:00",
    clinicName: "QuickCare Clinic",
    notificationSound: "enabled"
  });
  const [settingsErrors, setSettingsErrors] = useState({});
  const [thresholds, setThresholds] = useState({
    temperature: { min: 36, max: 38 },
    pulseRate: { min: 60, max: 100 },
    bloodPressureSystolic: { min: 90, max: 140 },
    bloodPressureDiastolic: { min: 60, max: 90 },
    weight: { min: 40, max: 150 },
    deviceUptimeWarning: 95
  });

  const handleSettingsChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: field === "maxQueueSize" ? parseInt(value) : value
    }));
    if (settingsErrors[field]) {
      setSettingsErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleToggleSetting = (setting) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!systemSettings.clinicName) errors.clinicName = "Clinic name is required";
    if (!systemSettings.workingHours) errors.workingHours = "Working hours are required";
    if (systemSettings.maxQueueSize < 5 || systemSettings.maxQueueSize > 100) {
      errors.maxQueueSize = "Queue size must be between 5 and 100";
    }
    
    if (Object.keys(errors).length === 0) {
      addNotification("Settings saved successfully!");
      setSettingsErrors({});
    } else {
      setSettingsErrors(errors);
      addNotification("Please fix the settings errors");
    }
  };

  const handleUpdateThreshold = (field, minOrMax, value) => {
    setThresholds(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [minOrMax]: parseFloat(value)
      }
    }));
  };

  const handleSaveThresholds = () => {
    addNotification("Thresholds updated successfully!");
  };

  return {
    systemSettings,
    settingsErrors,
    thresholds,
    handleSettingsChange,
    handleToggleSetting,
    handleSettingsSubmit,
    handleUpdateThreshold,
    handleSaveThresholds,
    setThresholds
  };
}
