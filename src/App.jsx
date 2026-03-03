import React, { useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// Components
import Header from "./components/header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationList from "./components/NotificationList";

// Pages
import Dashboard from "./pages/Dashboard";
import PatientMonitoring from "./pages/PatientMonitoring";
import Queue from "./pages/Queue";
import Reports from "./pages/Reports";
import Devices from "./pages/Devices";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

// Custom Hooks
import { useAuthHandlers } from "./hooks/useAuthHandlers";
import { usePatientHandlers } from "./hooks/usePatientHandlers";
import { useVitalHandlers } from "./hooks/useVitalHandlers";
import { useQueueHandlers } from "./hooks/useQueueHandlers";
import { useSettingsHandlers } from "./hooks/useSettingsHandlers";
import { useDeviceHandlers } from "./hooks/useDeviceHandlers";
import { useUserHandlers } from "./hooks/useUserHandlers";
import { useAlertHandlers } from "./hooks/useAlertHandlers";

import "./styles/style.css";

function App() {
  // Counter for notification IDs
  const notificationIdRef = useRef(0);

  // ========================
  // NOTIFICATION SYSTEM
  // ========================
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = (message) => {
    const id = ++notificationIdRef.current;
    setNotifications(prev => [...prev, { id, message }]);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // ========================
  // INIT CUSTOM HOOKS
  // ========================
  const auth = useAuthHandlers(addNotification);
  const patient = usePatientHandlers(addNotification);
  const vitals = useVitalHandlers(addNotification);
  const queue = useQueueHandlers(addNotification);
  const settings = useSettingsHandlers(addNotification);
  const devices = useDeviceHandlers();
  const users = useUserHandlers(addNotification);
  const alerts = useAlertHandlers(addNotification);

  // ========================
  // NAVIGATION (React Router)
  // ========================
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === "dashboard" ? "" : page}`);
    addNotification(`Navigated to ${page.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/");
  };

  // ========================
  // VITAL READINGS HISTORY (FOR GRAPHS)
  // ========================
  const [vitalReadingsHistory] = React.useState({
    daily: [
      { time: "08:00", temp: 36.5, pulse: 68, bp: "118/76" },
      { time: "10:00", temp: 36.8, pulse: 72, bp: "120/80" },
      { time: "12:00", temp: 37.2, pulse: 75, bp: "122/82" },
      { time: "14:00", temp: 37.0, pulse: 70, bp: "119/79" },
      { time: "16:00", temp: 36.9, pulse: 73, bp: "121/80" }
    ],
    weekly: [
      { day: "Mon", avgTemp: 36.8, avgPulse: 72, avgBP: "120/80" },
      { day: "Tue", avgTemp: 36.9, avgPulse: 73, avgBP: "121/81" },
      { day: "Wed", avgTemp: 37.0, avgPulse: 75, avgBP: "122/82" },
      { day: "Thu", avgTemp: 36.7, avgPulse: 70, avgBP: "119/78" },
      { day: "Fri", avgTemp: 36.8, avgPulse: 71, avgBP: "120/79" },
      { day: "Sat", avgTemp: 36.6, avgPulse: 69, avgBP: "118/77" },
      { day: "Sun", avgTemp: 36.9, avgPulse: 72, avgBP: "121/80" }
    ],
    monthly: [
      { week: "Week 1", avgTemp: 36.8, avgPulse: 72, avgBP: "120/80" },
      { week: "Week 2", avgTemp: 36.9, avgPulse: 73, avgBP: "121/81" },
      { week: "Week 3", avgTemp: 37.0, avgPulse: 74, avgBP: "122/82" },
      { week: "Week 4", avgTemp: 36.8, avgPulse: 72, avgBP: "120/80" }
    ],
    yearly: [
      { yearly: "Year 1", avgTemp: 26.8, avgPulse: 72, avgBP: "120/80" },
      { yearly: "Year 2", avgTemp: 20.9, avgPulse: 73, avgBP: "121/81" },
      { yearly: "Year 3", avgTemp: 37.0, avgPulse: 74, avgBP: "122/82" }
    ]
  });

  // ========================
  // DEVICE UPTIME TRACKING
  // ========================
  const [deviceUptimeMetrics] = React.useState({
    daily: { "Temperature Sensor A": 99.8, "Blood Pressure Monitor": 99.5, "Pulse Oximeter": 85.2, "Weight Scale": 100 },
    weekly: { "Temperature Sensor A": 98.5, "Blood Pressure Monitor": 96.8, "Pulse Oximeter": 80.3, "Weight Scale": 99.2 },
    monthly: { "Temperature Sensor A": 97.2, "Blood Pressure Monitor": 95.5, "Pulse Oximeter": 78.6, "Weight Scale": 98.8 },
    yearly: { "Temperature Sensor A": 96.8, "Blood Pressure Monitor": 94.2, "Pulse Oximeter": 75.4, "Weight Scale": 97.5 }
  });

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!auth.isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // Get current page from URL
  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path === "/" || path === "/login") return "login";
    return path.replace("/", "");
  };

  const currentPage = getCurrentPage();

  return (
    <>
      <Header />

      {!auth.isAuthenticated ? (
        // ========================
        // LOGIN / SIGNUP PAGE (Public Route)
        // ========================
        <Routes>
          <Route 
            path="/" 
            element={
              <Login 
                activeTab={auth.activeTab}
                setActiveTab={auth.setActiveTab}
                loginForm={auth.loginForm}
                loginErrors={auth.loginErrors}
                handleLoginFormChange={auth.handleLoginFormChange}
                handleLoginSubmit={auth.handleLoginSubmit}
                signupForm={auth.signupForm}
                signupErrors={auth.signupErrors}
                handleSignupFormChange={auth.handleSignupFormChange}
                handleSignupSubmit={auth.handleSignupSubmit}
              />
            } 
          />
        </Routes>
      ) : (
        // ========================
        // AUTHENTICATED APP (Protected Routes)
        // ========================
        <div className="dashboard-wrapper">
          {/* NAVIGATION NAVBAR */}
          <Navbar 
            currentPage={currentPage}
            currentUser={auth.currentUser}
            handleNavigate={handleNavigate}
            handleLogout={handleLogout}
          />

          {/* MAIN CONTENT AREA */}
          <main className="dashboard-content">
            {/* Notifications */}
            <NotificationList notifications={notifications} />

            <Routes>
              {/* ============================== */}
              {/* PAGE: DASHBOARD */}
              {/* ============================== */}
              <Route 
                path="/dashboard" 
                element={
                  <Dashboard 
                    recentPatients={patient.recentPatients}
                    queueNumber={queue.queueNumber}
                    vitals={vitals.vitals}
                    queueStatus={queue.queueStatus}
                    patient={patient.patient}
                    patientErrors={patient.patientErrors}
                    handlePatientChange={patient.handlePatientChange}
                    handleRegisterPatient={patient.handleRegisterPatient}
                    handleViewPatient={(id) => {
                      patient.handleViewPatient(id);
                      handleNavigate("patientMonitoring");
                    }}
                    handleRemovePatient={patient.handleRemovePatient}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: PATIENT MONITORING */}
              {/* ============================== */}
              <Route 
                path="/patientMonitoring" 
                element={
                  <PatientMonitoring 
                    selectedPatientId={patient.selectedPatientId}
                    getSelectedPatient={patient.getSelectedPatient}
                    patient={patient.patient}
                    vitals={vitals.vitals}
                    vitalErrors={vitals.vitalErrors}
                    handleVitalsChange={vitals.handleVitalsChange}
                    handleVitalsSubmit={vitals.handleVitalsSubmit}
                    handleBackToDashboard={() => handleNavigate("dashboard")}
                    recentPatients={patient.recentPatients}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: QUEUE MANAGEMENT */}
              {/* ============================== */}
              <Route 
                path="/queueManagement" 
                element={
                  <Queue 
                    queueNumber={queue.queueNumber}
                    queueStatus={queue.queueStatus}
                    systemSettings={settings.systemSettings}
                    recentPatients={patient.recentPatients}
                    handleCallNextPatient={() => queue.handleCallNextPatient(settings.systemSettings, settings.systemSettings.maxQueueSize)}
                    handleToggleQueueStatus={queue.handleToggleQueueStatus}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: REPORTS */}
              {/* ============================== */}
              <Route 
                path="/reports" 
                element={
                  <Reports 
                    alertHistory={alerts.alertHistory}
                    reportPeriod={alerts.reportPeriod}
                    setReportPeriod={alerts.setReportPeriod}
                    vitalReadingsHistory={vitalReadingsHistory}
                    deviceUptimeMetrics={deviceUptimeMetrics}
                    thresholds={settings.thresholds}
                    recentPatients={patient.recentPatients}
                    devices={devices.devices}
                    queueStatus={queue.queueStatus}
                    handleClearAllAlerts={alerts.handleClearAllAlerts}
                    handleResolveAlert={alerts.handleResolveAlert}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: DEVICES */}
              {/* ============================== */}
              <Route 
                path="/devices" 
                element={
                  <Devices 
                    devices={devices.devices}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: USERS */}
              {/* ============================== */}
              <Route 
                path="/users" 
                element={
                  <Users 
                    pendingUsers={users.pendingUsers}
                    approvedUsers={users.approvedUsers}
                    handleAcceptUser={users.handleAcceptUser}
                    handleDeclineUser={users.handleDeclineUser}
                    handleRemoveApprovedUser={users.handleRemoveApprovedUser}
                  />
                } 
              />

              {/* ============================== */}
              {/* PAGE: SETTINGS */}
              {/* ============================== */}
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    systemSettings={settings.systemSettings}
                    settingsErrors={settings.settingsErrors}
                    thresholds={settings.thresholds}
                    handleSettingsChange={settings.handleSettingsChange}
                    handleSettingsSubmit={settings.handleSettingsSubmit}
                    handleToggleSetting={settings.handleToggleSetting}
                    handleUpdateThreshold={settings.handleUpdateThreshold}
                    handleSaveThresholds={settings.handleSaveThresholds}
                    setThresholds={settings.setThresholds}
                  />
                } 
              />

              {/* Default redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
