import { useState } from "react";

export function usePatientHandlers(addNotification) {
  const [patient, setPatient] = useState({
    id: "QC-1023",
    name: "Juan Dela Cruz",
    age: 22,
    sex: "Male",
    contact: "09123456789"
  });
  const [patientErrors, setPatientErrors] = useState({});
  const [recentPatients, setRecentPatients] = useState([
    { id: 1, name: "Maria Santos", registeredAt: "10:30 AM" },
    { id: 2, name: "Pedro Reyes", registeredAt: "10:15 AM" },
    { id: 3, name: "Ana Lopez", registeredAt: "10:00 AM" }
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const validatePatientForm = () => {
    const errors = {};
    if (!patient.id) errors.id = "Patient ID is required";
    if (!patient.name) errors.name = "Name is required";
    if (!patient.age || patient.age < 0 || patient.age > 150) errors.age = "Age must be between 0 and 150";
    if (!patient.contact) {
      errors.contact = "Contact is required";
    } else if (!/^\d{10,11}$/.test(patient.contact.replace(/\D/g, ''))) {
      errors.contact = "Contact must be 10-11 digits";
    }
    return errors;
  };

  const handlePatientChange = (field, value) => {
    setPatient(prev => ({
      ...prev,
      [field]: field === "age" ? parseInt(value) || "" : value
    }));
    if (patientErrors[field]) {
      setPatientErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    const errors = validatePatientForm();
    if (Object.keys(errors).length === 0) {
      const newPatient = {
        id: recentPatients.length + 1,
        name: patient.name,
        registeredAt: new Date().toLocaleTimeString()
      };
      setRecentPatients(prev => [newPatient, ...prev.slice(0, 2)]);
      addNotification(`Patient ${patient.name} registered successfully!`);
      setPatientErrors({});
      setPatient({ id: "", name: "", age: "", sex: "Male", contact: "" });
    } else {
      setPatientErrors(errors);
      addNotification("Please fix the errors in the patient form");
    }
  };

  const handleRemovePatient = (patientId) => {
    setRecentPatients(prev => prev.filter(p => p.id !== patientId));
    addNotification("Patient removed from recent list");
  };

  const handleViewPatient = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleBackToDashboard = () => {
    setSelectedPatientId(null);
  };

  const getSelectedPatient = () => {
    if (!selectedPatientId) return null;
    return recentPatients.find(p => p.id === selectedPatientId);
  };

  return {
    patient,
    patientErrors,
    recentPatients,
    selectedPatientId,
    handlePatientChange,
    handleRegisterPatient,
    handleRemovePatient,
    handleViewPatient,
    handleBackToDashboard,
    getSelectedPatient
  };
}
