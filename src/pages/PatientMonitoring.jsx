import React from "react";

export default function PatientMonitoring({
  selectedPatientId,
  getSelectedPatient,
  patient,
  vitals,
  vitalErrors,
  handleVitalsChange,
  handleVitalsSubmit,
  handleBackToDashboard,
  recentPatients
}) {
  return (
    <div className="page-content">
      <button className="back-button" onClick={handleBackToDashboard}>
        ← Back to Dashboard
      </button>

      {selectedPatientId && getSelectedPatient() ? (
        <>
          <section className="card card-full">
            <h2>Patient Details - {getSelectedPatient()?.name}</h2>
            <div className="patient-details-grid">
              <div className="detail-item">
                <span className="detail-label">Patient Name:</span>
                <span className="detail-value">{getSelectedPatient()?.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Patient Age:</span>
                <span className="detail-value">{patient.age} years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sex:</span>
                <span className="detail-value">{patient.sex}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{patient.contact}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Patient ID:</span>
                <span className="detail-value">{patient.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registered At:</span>
                <span className="detail-value">{getSelectedPatient()?.registeredAt}</span>
              </div>
            </div>
          </section>

          {/* Vitals Monitoring Form */}
          <section className="card">
            <h2>Vitals Monitoring</h2>
            <form onSubmit={handleVitalsSubmit}>
              <div className="vitals-grid">
                <div className="vital-input">
                  <label>Temperature (°C) *</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => handleVitalsChange("temperature", e.target.value)}
                    className={vitalErrors.temperature ? "input-error" : ""}
                  />
                  {vitalErrors.temperature && <span className="error-message">{vitalErrors.temperature}</span>}
                </div>

                <div className="vital-input">
                  <label>Blood Pressure *</label>
                  <input 
                    type="text" 
                    value={vitals.bloodPressure}
                    onChange={(e) => handleVitalsChange("bloodPressure", e.target.value)}
                    placeholder="120/80"
                  />
                </div>

                <div className="vital-input">
                  <label>Pulse Rate (bpm) *</label>
                  <input 
                    type="number"
                    value={vitals.pulseRate}
                    onChange={(e) => handleVitalsChange("pulseRate", e.target.value)}
                    className={vitalErrors.pulseRate ? "input-error" : ""}
                  />
                  {vitalErrors.pulseRate && <span className="error-message">{vitalErrors.pulseRate}</span>}
                </div>

                <div className="vital-input">
                  <label>Weight (kg) *</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={vitals.weight}
                    onChange={(e) => handleVitalsChange("weight", e.target.value)}
                    className={vitalErrors.weight ? "input-error" : ""}
                  />
                  {vitalErrors.weight && <span className="error-message">{vitalErrors.weight}</span>}
                </div>

                <div className="vital-input">
                  <label>Height (cm) *</label>
                  <input 
                    type="number"
                    value={vitals.height}
                    onChange={(e) => handleVitalsChange("height", e.target.value)}
                    className={vitalErrors.height ? "input-error" : ""}
                  />
                  {vitalErrors.height && <span className="error-message">{vitalErrors.height}</span>}
                </div>
              </div>
              
              <div className={`vital-status ${vitals.status.toLowerCase()}`}>
                <p><strong>Health Status:</strong> {vitals.status}</p>
              </div>

              <button type="submit" className="btn-submit primary">
                Update Patient Vitals
              </button>
            </form>
          </section>

          <section className="card">
            <h2>Vital Readings Summary</h2>
            <div className="vitals-summary">
              <div className="vital-display">
                <span className="vital-label">Temperature</span>
                <span className="vital-value">{vitals.temperature}°C</span>
              </div>
              <div className="vital-display">
                <span className="vital-label">Blood Pressure</span>
                <span className="vital-value">{vitals.bloodPressure}</span>
              </div>
              <div className="vital-display">
                <span className="vital-label">Pulse Rate</span>
                <span className="vital-value">{vitals.pulseRate} bpm</span>
              </div>
              <div className="vital-display">
                <span className="vital-label">Weight</span>
                <span className="vital-value">{vitals.weight} kg</span>
              </div>
              <div className="vital-display">
                <span className="vital-label">Height</span>
                <span className="vital-value">{vitals.height} cm</span>
              </div>
              <div className="vital-display">
                <span className="vital-label">Status</span>
                <span className={`vital-value ${vitals.status.toLowerCase()}`}>{vitals.status}</span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="card">
          <p className="empty-state">Please select a patient from the dashboard to view details</p>
        </section>
      )}
    </div>
  );
}
