import React from "react";

export default function Settings({
  systemSettings,
  settingsErrors,
  thresholds,
  handleSettingsChange,
  handleSettingsSubmit,
  handleToggleSetting,
  handleUpdateThreshold,
  handleSaveThresholds,
  setThresholds
}) {
  return (
    <div className="page-content">
      <section className="card">
        <h2>System Settings & Configuration</h2>
        <form onSubmit={handleSettingsSubmit}>
          <div className="form-group">
            <label>Clinic Name *</label>
            <input 
              type="text"
              value={systemSettings.clinicName}
              onChange={(e) => handleSettingsChange("clinicName", e.target.value)}
              placeholder="Enter clinic name"
              className={settingsErrors.clinicName ? "input-error" : ""}
            />
            {settingsErrors.clinicName && <span className="error-message">{settingsErrors.clinicName}</span>}
          </div>

          <div className="form-group">
            <label>Working Hours *</label>
            <input 
              type="text"
              value={systemSettings.workingHours}
              onChange={(e) => handleSettingsChange("workingHours", e.target.value)}
              placeholder="08:00-17:00"
              className={settingsErrors.workingHours ? "input-error" : ""}
            />
            {settingsErrors.workingHours && <span className="error-message">{settingsErrors.workingHours}</span>}
          </div>

          <div className="form-group">
            <label>Max Queue Size (5-100) *</label>
            <input 
              type="number"
              min="5"
              max="100"
              value={systemSettings.maxQueueSize}
              onChange={(e) => handleSettingsChange("maxQueueSize", e.target.value)}
              className={settingsErrors.maxQueueSize ? "input-error" : ""}
            />
            {settingsErrors.maxQueueSize && <span className="error-message">{settingsErrors.maxQueueSize}</span>}
          </div>

          <div className="settings-toggles">
            <div className="toggle-item">
              <label>Dark Mode</label>
              <button 
                type="button"
                className={`toggle-switch ${systemSettings.darkMode ? 'active' : ''}`}
                onClick={() => handleToggleSetting("darkMode")}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="toggle-item">
              <label>Sound Notifications</label>
              <button 
                type="button"
                className={`toggle-switch ${systemSettings.soundNotifications ? 'active' : ''}`}
                onClick={() => handleToggleSetting("soundNotifications")}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit primary">
            Save Settings
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Vital Sign Thresholds</h2>
        <form onSubmit={handleSaveThresholds}>
          <p className="section-description">Set alert thresholds for vital sign readings</p>
          
          <div className="threshold-grid">
            <div className="threshold-group">
              <h3>Temperature (°C)</h3>
              <div className="threshold-inputs">
                <div className="threshold-input">
                  <label>Min</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={thresholds.temperature.min}
                    onChange={(e) => handleUpdateThreshold("temperature", "min", e.target.value)}
                  />
                </div>
                <div className="threshold-input">
                  <label>Max</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={thresholds.temperature.max}
                    onChange={(e) => handleUpdateThreshold("temperature", "max", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="threshold-group">
              <h3>Pulse Rate (bpm)</h3>
              <div className="threshold-inputs">
                <div className="threshold-input">
                  <label>Min</label>
                  <input 
                    type="number"
                    value={thresholds.pulseRate.min}
                    onChange={(e) => handleUpdateThreshold("pulseRate", "min", e.target.value)}
                  />
                </div>
                <div className="threshold-input">
                  <label>Max</label>
                  <input 
                    type="number"
                    value={thresholds.pulseRate.max}
                    onChange={(e) => handleUpdateThreshold("pulseRate", "max", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="threshold-group">
              <h3>BP Systolic</h3>
              <div className="threshold-inputs">
                <div className="threshold-input">
                  <label>Min</label>
                  <input 
                    type="number"
                    value={thresholds.bloodPressureSystolic.min}
                    onChange={(e) => handleUpdateThreshold("bloodPressureSystolic", "min", e.target.value)}
                  />
                </div>
                <div className="threshold-input">
                  <label>Max</label>
                  <input 
                    type="number"
                    value={thresholds.bloodPressureSystolic.max}
                    onChange={(e) => handleUpdateThreshold("bloodPressureSystolic", "max", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="threshold-group">
              <h3>BP Diastolic</h3>
              <div className="threshold-inputs">
                <div className="threshold-input">
                  <label>Min</label>
                  <input 
                    type="number"
                    value={thresholds.bloodPressureDiastolic.min}
                    onChange={(e) => handleUpdateThreshold("bloodPressureDiastolic", "min", e.target.value)}
                  />
                </div>
                <div className="threshold-input">
                  <label>Max</label>
                  <input 
                    type="number"
                    value={thresholds.bloodPressureDiastolic.max}
                    onChange={(e) => handleUpdateThreshold("bloodPressureDiastolic", "max", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="threshold-group">
              <h3>Weight (kg)</h3>
              <div className="threshold-inputs">
                <div className="threshold-input">
                  <label>Min</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={thresholds.weight.min}
                    onChange={(e) => handleUpdateThreshold("weight", "min", e.target.value)}
                  />
                </div>
                <div className="threshold-input">
                  <label>Max</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={thresholds.weight.max}
                    onChange={(e) => handleUpdateThreshold("weight", "max", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="threshold-group">
              <h3>Device Uptime Alert</h3>
              <div className="threshold-inputs">
                <div className="threshold-input full-width">
                  <label>Alert if below (%)</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={thresholds.deviceUptimeWarning}
                    onChange={(e) => setThresholds(prev => ({ ...prev, deviceUptimeWarning: parseFloat(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-submit primary">
            Save Thresholds
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Current Configuration</h2>
        <div className="settings-display">
          <div className="setting-display-item">
            <span className="setting-label">Clinic Name:</span>
            <span className="setting-value">{systemSettings.clinicName}</span>
          </div>
          <div className="setting-display-item">
            <span className="setting-label">Working Hours:</span>
            <span className="setting-value">{systemSettings.workingHours}</span>
          </div>
          <div className="setting-display-item">
            <span className="setting-label">Max Queue Size:</span>
            <span className="setting-value">{systemSettings.maxQueueSize}</span>
          </div>
          <div className="setting-display-item">
            <span className="setting-label">Dark Mode:</span>
            <span className="setting-value">{systemSettings.darkMode ? "Enabled" : "Disabled"}</span>
          </div>
          <div className="setting-display-item">
            <span className="setting-label">Sound Notifications:</span>
            <span className="setting-value">{systemSettings.soundNotifications ? "Enabled" : "Disabled"}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
