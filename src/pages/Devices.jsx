import React from "react";

export default function Devices({ devices }) {
  return (
    <div className="page-content">
      <section className="card card-full">
        <h2>Device & Sensor Management</h2>
        <div className="devices-summary">
          <div className="summary-stat">
            <span className="stat-label">Total Devices</span>
            <span className="stat-value">{devices.length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Online</span>
            <span className="stat-value online">{devices.filter(d => d.status === "online").length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Offline</span>
            <span className="stat-value offline">{devices.filter(d => d.status === "offline").length}</span>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Connected Devices</h2>
        {devices.length > 0 ? (
          <div className="devices-list">
            {devices.map((device) => (
              <div key={device.id} className={`device-item status-${device.status}`}>
                <div className="device-header">
                  <div className="device-info">
                    <h3 className="device-name">{device.name}</h3>
                    <p className="device-type">{device.type} | Location: {device.location}</p>
                  </div>
                  <div className={`device-status-badge ${device.status}`}>
                    <span className="status-dot"></span>
                    {device.status.toUpperCase()}
                  </div>
                </div>
                <div className="device-footer">
                  <div className="device-footer-info">
                    <p className="device-update">Last updated: {device.lastUpdate}</p>
                    {device.status === "offline" && device.reason && (
                      <p className="device-reason">⚠️ {device.reason}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No devices connected</p>
        )}
      </section>

      <section className="card">
        <h2>Device Status Legend</h2>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-badge online">●</span>
            <span>Device is online and functioning properly</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge offline">●</span>
            <span>Device is offline or not responding</span>
          </div>
        </div>
      </section>
    </div>
  );
}
