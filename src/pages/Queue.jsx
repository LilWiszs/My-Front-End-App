import React from "react";

export default function Queue({
  queueNumber,
  queueStatus,
  systemSettings,
  recentPatients,
  handleCallNextPatient,
  handleToggleQueueStatus
}) {
  return (
    <div className="page-content">
      <section className="card card-full">
        <h2>Queue Management System</h2>
        <div className="queue-display">
          <div className="queue-main">
            <p className={`queue-number-large ${queueStatus.toLowerCase()}`}>
              {queueNumber}
            </p>
            <p className="queue-label">Current Queue Number</p>
          </div>
          <div className="queue-info">
            <p><strong>Status:</strong> <span className={`badge ${queueStatus.toLowerCase()}`}>{queueStatus}</span></p>
            <p><strong>Max Capacity:</strong> {systemSettings.maxQueueSize}</p>
            <p><strong>Patients Registered:</strong> {recentPatients.length}</p>
            <p><strong>Queue Progress:</strong> {Math.round((queueNumber / systemSettings.maxQueueSize) * 100)}%</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Queue Controls</h2>
        <div className="queue-actions-large">
          <button onClick={handleCallNextPatient} className="primary large">
            📢 Call Next Patient (#{queueNumber + 1})
          </button>
          <button onClick={handleToggleQueueStatus} className="secondary large">
            {queueStatus === "Active" ? "🔴 Close Queue" : "🟢 Open Queue"}
          </button>
        </div>
        <div className="queue-progress-bar">
          <div className="progress" style={{width: `${(queueNumber / systemSettings.maxQueueSize) * 100}%`}}></div>
        </div>
      </section>

      <section className="card">
        <h2>Waiting Patients</h2>
        {recentPatients.length > 0 ? (
          <div className="waiting-patients-list">
            {recentPatients.map((person, index) => (
              <div key={person.id} className="waiting-patient">
                <div className="patient-position">{index + 1}</div>
                <div className="patient-waiting-info">
                  <p className="patient-name">{person.name}</p>
                  <p className="patient-registered">Registered at {person.registeredAt}</p>
                </div>
                <div className="patient-wait-time">
                  <span className="wait-label">Waiting</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No patients in queue</p>
        )}
      </section>
    </div>
  );
}
