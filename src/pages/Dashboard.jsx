import React from "react";

export default function DashboardPlaceholder({
  recentPatients,
  queueNumber,
  vitals,
  queueStatus,
  patient,
  patientErrors,
  handlePatientChange,
  handleRegisterPatient,
  handleViewPatient,
  handleRemovePatient
}) {
  return (
    <div className="page-content">
      <section className="card card-full">
        <h2>Dashboard Overview</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{recentPatients.length}</div>
            <div className="stat-label">Recent Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{queueNumber}</div>
            <div className="stat-label">Current Queue</div>
          </div>
          <div className="stat-card">
            <div className={`stat-number ${vitals.status.toLowerCase()}`}>{vitals.status}</div>
            <div className="stat-label">Last Vitals Status</div>
          </div>
          <div className="stat-card">
            <div className={`stat-number ${queueStatus.toLowerCase()}`}>{queueStatus}</div>
            <div className="stat-label">Queue Status</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Patient Registration Form</h2>
        <form onSubmit={handleRegisterPatient}>
          <div className="form-group">
            <label>Patient ID *</label>
            <input 
              type="text" 
              value={patient.id} 
              onChange={(e) => handlePatientChange("id", e.target.value)}
              placeholder="e.g., QC-1023" 
              className={patientErrors.id ? "input-error" : ""}
            />
            {patientErrors.id && <span className="error-message">{patientErrors.id}</span>}
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              value={patient.name} 
              onChange={(e) => handlePatientChange("name", e.target.value)}
              placeholder="Enter patient name" 
              className={patientErrors.name ? "input-error" : ""}
            />
            {patientErrors.name && <span className="error-message">{patientErrors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <input 
                type="number" 
                value={patient.age} 
                onChange={(e) => handlePatientChange("age", e.target.value)}
                placeholder="Age" 
                className={patientErrors.age ? "input-error" : ""}
              />
              {patientErrors.age && <span className="error-message">{patientErrors.age}</span>}
            </div>

            <div className="form-group">
              <label>Sex *</label>
              <select 
                value={patient.sex} 
                onChange={(e) => handlePatientChange("sex", e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Contact Number *</label>
            <input 
              type="tel" 
              value={patient.contact} 
              onChange={(e) => handlePatientChange("contact", e.target.value)}
              placeholder="09123456789" 
              className={patientErrors.contact ? "input-error" : ""}
            />
            {patientErrors.contact && <span className="error-message">{patientErrors.contact}</span>}
          </div>

          <button type="submit" className="btn-submit primary">
            Register Patient
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Recently Registered Patients</h2>
        {recentPatients.length > 0 ? (
          <div className="patient-list">
            {recentPatients.map((person) => (
              <div key={person.id} className="patient-item">
                <div className="patient-info">
                  <p className="patient-name">{person.name}</p>
                  <p className="patient-time">{person.registeredAt}</p>
                </div>
                <div className="patient-actions">
                  <button 
                    onClick={() => handleViewPatient(person.id)}
                    className="view-btn"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleRemovePatient(person.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No patients registered yet</p>
        )}
      </section>
    </div>
  );
}
