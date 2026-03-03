import React from "react";

export default function Reports({
  alertHistory,
  reportPeriod,
  setReportPeriod,
  vitalReadingsHistory,
  deviceUptimeMetrics,
  thresholds,
  recentPatients,
  devices,
  queueStatus,
  handleClearAllAlerts,
  handleResolveAlert
}) {
  return (
    <div className="page-content">
      {/* ALERTS SECTION */}
      <section className="card card-full">
        <div className="alerts-header">
          <h2>⚠️ Alerts & Notifications</h2>
          <button onClick={handleClearAllAlerts} className="btn-secondary">Clear All</button>
        </div>
        <div className="alerts-list">
          {alertHistory.length > 0 ? (
            alertHistory.map((alert) => (
              <div key={alert.id} className={`alert-item severity-${alert.severity} ${alert.resolved ? 'resolved' : ''}`}>
                <div className="alert-content">
                  <span className={`alert-type ${alert.type}`}>{alert.type.toUpperCase()}</span>
                  <span className="alert-message">{alert.message}</span>
                  <span className="alert-time">{alert.timestamp}</span>
                </div>
                {!alert.resolved && (
                  <button 
                    onClick={() => handleResolveAlert(alert.id)}
                    className="btn-resolve"
                  >
                    Resolve
                  </button>
                )}
                {alert.resolved && <span className="alert-resolved-badge">✓ Resolved</span>}
              </div>
            ))
          ) : (
            <p className="empty-state">No alerts</p>
          )}
        </div>
      </section>

      {/* REPORT PERIOD SELECTOR */}
      <section className="card">
        <h2>Vital Signs Report</h2>
        <div className="report-period-selector">
          <button 
            onClick={() => setReportPeriod("daily")}
            className={`period-btn ${reportPeriod === "daily" ? "active" : ""}`}
          >
            📅 Daily
          </button>
          <button 
            onClick={() => setReportPeriod("weekly")}
            className={`period-btn ${reportPeriod === "weekly" ? "active" : ""}`}
          >
            📊 Weekly
          </button>
          <button 
            onClick={() => setReportPeriod("monthly")}
            className={`period-btn ${reportPeriod === "monthly" ? "active" : ""}`}
          >
            📈 Monthly
          </button>
        </div>

        {reportPeriod === "daily" && (
          <div className="report-content">
            <div className="report-grid">
              <div className="chart-container">
                <h3>Temperature Trend</h3>
                <div className="simple-chart temperature">
                  {vitalReadingsHistory.daily.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.temp / 40) * 200}px`}} title={`${reading.temp}°C @ ${reading.time}`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.daily.map((reading, idx) => (
                    <span key={idx}>{reading.time}</span>
                  ))}
                </div>
              </div>

              <div className="chart-container">
                <h3>Pulse Rate Trend</h3>
                <div className="simple-chart pulse">
                  {vitalReadingsHistory.daily.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.pulse / 120) * 200}px`}} title={`${reading.pulse} bpm @ ${reading.time}`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.daily.map((reading, idx) => (
                    <span key={idx}>{reading.time}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="vital-stats">
              <h3>Daily Vitals Summary</h3>
              <div className="stats-grid">
                {vitalReadingsHistory.daily.map((reading, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-time">{reading.time}</div>
                    <div className="stat-details">
                      <div>🌡️ {reading.temp}°C</div>
                      <div>❤️ {reading.pulse} bpm</div>
                      <div>🩺 {reading.bp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reportPeriod === "weekly" && (
          <div className="report-content">
            <div className="report-grid">
              <div className="chart-container">
                <h3>Weekly Avg Temperature</h3>
                <div className="simple-chart temperature">
                  {vitalReadingsHistory.weekly.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.avgTemp / 40) * 200}px`}} title={`${reading.avgTemp}°C`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.weekly.map((reading, idx) => (
                    <span key={idx}>{reading.day}</span>
                  ))}
                </div>
              </div>

              <div className="chart-container">
                <h3>Weekly Avg Pulse Rate</h3>
                <div className="simple-chart pulse">
                  {vitalReadingsHistory.weekly.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.avgPulse / 120) * 200}px`}} title={`${reading.avgPulse} bpm`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.weekly.map((reading, idx) => (
                    <span key={idx}>{reading.day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {reportPeriod === "monthly" && (
          <div className="report-content">
            <div className="report-grid">
              <div className="chart-container">
                <h3>Monthly Avg Temperature</h3>
                <div className="simple-chart temperature">
                  {vitalReadingsHistory.monthly.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.avgTemp / 40) * 200}px`}} title={`${reading.avgTemp}°C`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.monthly.map((reading, idx) => (
                    <span key={idx}>{reading.week}</span>
                  ))}
                </div>
              </div>

              <div className="chart-container">
                <h3>Monthly Avg Pulse Rate</h3>
                <div className="simple-chart pulse">
                  {vitalReadingsHistory.monthly.map((reading, idx) => (
                    <div key={idx} className="chart-bar" style={{height: `${(reading.avgPulse / 120) * 200}px`}} title={`${reading.avgPulse} bpm`}></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {vitalReadingsHistory.monthly.map((reading, idx) => (
                    <span key={idx}>{reading.week}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DEVICE UPTIME SECTION */}
      <section className="card">
        <h2>Device Uptime Report</h2>
        <div className="report-period-selector">
          <button 
            onClick={() => setReportPeriod("daily")}
            className={`period-btn ${reportPeriod === "daily" ? "active" : ""}`}
          >
            📅 Daily
          </button>
          <button 
            onClick={() => setReportPeriod("weekly")}
            className={`period-btn ${reportPeriod === "weekly" ? "active" : ""}`}
          >
            📊 Weekly
          </button>
          <button 
            onClick={() => setReportPeriod("monthly")}
            className={`period-btn ${reportPeriod === "monthly" ? "active" : ""}`}
          >
            📈 Monthly
          </button>
        </div>

        <div className="uptime-metrics">
          {Object.entries(
            reportPeriod === "daily" ? deviceUptimeMetrics.daily :
            reportPeriod === "weekly" ? deviceUptimeMetrics.weekly :
            deviceUptimeMetrics.monthly
          ).map(([device, uptime]) => (
            <div key={device} className="uptime-item">
              <div className="uptime-info">
                <h3>{device}</h3>
                <div className="uptime-bar-container">
                  <div className="uptime-bar">
                    <div 
                      className={`uptime-fill ${uptime >= thresholds.deviceUptimeWarning ? 'good' : 'warning'}`}
                      style={{width: `${uptime}%`}}
                    ></div>
                  </div>
                  <span className="uptime-percentage">{uptime}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="card card-full">
        <h2>Overview Statistics</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Total Patients</h3>
            <div className="analytics-value">{recentPatients.length}</div>
            <p className="analytics-subtitle">Registered this session</p>
          </div>
          <div className="analytics-card">
            <h3>Active Alerts</h3>
            <div className="analytics-value">{alertHistory.filter(a => !a.resolved).length}</div>
            <p className="analytics-subtitle">Requiring attention</p>
          </div>
          <div className="analytics-card">
            <h3>Devices Online</h3>
            <div className="analytics-value">{devices.filter(d => d.status === "online").length}/{devices.length}</div>
            <p className="analytics-subtitle">Connected sensors</p>
          </div>
          <div className="analytics-card">
            <h3>Queue Status</h3>
            <div className={`analytics-value ${queueStatus.toLowerCase()}`}>{queueStatus}</div>
            <p className="analytics-subtitle">System operational</p>
          </div>
        </div>
      </section>
    </div>
  );
}
