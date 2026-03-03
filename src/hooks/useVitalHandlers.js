import { useState } from "react";

export function useVitalHandlers(addNotification) {
  const [vitals, setVitals] = useState({
    temperature: 36.8,
    bloodPressure: "120/80",
    pulseRate: 72,
    weight: 65,
    height: 170,
    status: "Normal"
  });
  const [vitalErrors, setVitalErrors] = useState({});

  const validateVitalsForm = () => {
    const errors = {};
    if (vitals.temperature < 35 || vitals.temperature > 42) {
      errors.temperature = "Temperature must be between 35°C and 42°C";
    }
    if (vitals.pulseRate < 40 || vitals.pulseRate > 200) {
      errors.pulseRate = "Pulse rate must be between 40 and 200 bpm";
    }
    if (vitals.weight < 5 || vitals.weight > 300) {
      errors.weight = "Weight must be between 5 and 300 kg";
    }
    if (vitals.height < 50 || vitals.height > 250) {
      errors.height = "Height must be between 50 and 250 cm";
    }
    return errors;
  };

  const calculateVitalStatus = (vitalData) => {
    const temp = vitalData.temperature;
    const pulse = vitalData.pulseRate;
    if (temp < 36 || temp > 38 || pulse < 60 || pulse > 100) {
      return "Warning";
    }
    return "Normal";
  };

  const handleVitalsChange = (field, value) => {
    const numValue = field === "bloodPressure" ? value : parseFloat(value) || "";
    const newVitals = { ...vitals, [field]: numValue };
    
    if (typeof numValue === "number") {
      const status = calculateVitalStatus(newVitals);
      newVitals.status = status;
    }
    
    setVitals(newVitals);
    if (vitalErrors[field]) {
      setVitalErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    const errors = validateVitalsForm();
    if (Object.keys(errors).length === 0) {
      addNotification(`Vitals recorded successfully - Status: ${vitals.status}`);
      setVitalErrors({});
    } else {
      setVitalErrors(errors);
      addNotification("Please fix the vital values");
    }
  };

  return {
    vitals,
    vitalErrors,
    handleVitalsChange,
    handleVitalsSubmit
  };
}
