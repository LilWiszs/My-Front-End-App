import { useState, useRef } from "react";
import Header from "./components/header";
import "./styles/style.css";

function App() {
  // Counter for notification IDs to avoid impure Date.now()
  const notificationIdRef = useRef(0);

  // ========================
  // ROUTING & NAVIGATION STATE
  // ========================
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard, patientMonitoring, queueManagement, settings, reports
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // -------------------------
  // AUTHENTICATION & USER STATE
  // -------------------------
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // -------------------------
  // LOGIN FORM STATE (CONTROLLED COMPONENT)
  // -------------------------
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [loginErrors, setLoginErrors] = useState({});

  // -------------------------
  // SIGNUP FORM STATE (CONTROLLED COMPONENT)
  // -------------------------
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [signupErrors, setSignupErrors] = useState({});

  // -------------------------
  // UI STATE
  // -------------------------
  const [notifications, setNotifications] = useState([]);

  // -------------------------
  // PATIENT REGISTRATION STATE
  // -------------------------
  const [patient, setPatient] = useState({
    id: "QC-1023",
    name: "Juan Dela Cruz",
    age: 22,
    sex: "Male",
    contact: "09123456789"
  });
  const [patientErrors, setPatientErrors] = useState({});

  // -------------------------
  // VITALS STATE
  // -------------------------
  const [vitals, setVitals] = useState({
    temperature: 36.8,
    bloodPressure: "120/80",
    pulseRate: 72,
    weight: 65,
    height: 170,
    status: "Normal" // System status based on vitals
  });
  const [vitalErrors, setVitalErrors] = useState({});

  // -------------------------
  // QUEUE MANAGEMENT STATE
  // -------------------------
  const [queueNumber, setQueueNumber] = useState(15);
  const [queueStatus, setQueueStatus] = useState("Active"); // Active or Closed

  // -------------------------
  // RECENT PATIENTS STATE
  // -------------------------
  const [recentPatients, setRecentPatients] = useState([
    { id: 1, name: "Maria Santos", registeredAt: "10:30 AM" },
    { id: 2, name: "Pedro Reyes", registeredAt: "10:15 AM" },
    { id: 3, name: "Ana Lopez", registeredAt: "10:00 AM" }
  ]);

  // -------------------------
  // SYSTEM SETTINGS STATE
  // -------------------------
  const [systemSettings, setSystemSettings] = useState({
    darkMode: false,
    soundNotifications: true,
    maxQueueSize: 50,
    workingHours: "08:00-17:00",
    clinicName: "QuickCare Clinic",
    notificationSound: "enabled"
  });
  const [settingsErrors, setSettingsErrors] = useState({});

  // ========================
  // FORM VALIDATION FUNCTIONS
  // ========================

  // Validate login form
  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Email is invalid";
    }
    if (!loginForm.password) {
      errors.password = "Password is required";
    } else if (loginForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  // Validate signup form
  const validateSignupForm = () => {
    const errors = {};
    if (!signupForm.fullName) {
      errors.fullName = "Full name is required";
    } else if (signupForm.fullName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters";
    }
    if (!signupForm.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = "Email is invalid";
    }
    if (!signupForm.password) {
      errors.password = "Password is required";
    } else if (signupForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  // Validate patient form
  const validatePatientForm = () => {
    const errors = {};
    if (!patient.id) {
      errors.id = "Patient ID is required";
    }
    if (!patient.name) {
      errors.name = "Name is required";
    }
    if (!patient.age || patient.age < 0 || patient.age > 150) {
      errors.age = "Age must be between 0 and 150";
    }
    if (!patient.contact) {
      errors.contact = "Contact is required";
    } else if (!/^\d{10,11}$/.test(patient.contact.replace(/\D/g, ''))) {
      errors.contact = "Contact must be 10-11 digits";
    }
    return errors;
  };

  // Validate vitals form
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

  // ========================
  // STATE UPDATE HANDLERS
  // ========================

  // Handle login form changes
  const handleLoginFormChange = (field, value) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (loginErrors[field]) {
      setLoginErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
    
    if (Object.keys(errors).length === 0) {
      handleLogin(loginForm.email);
      setLoginForm({ email: "", password: "" });
      setLoginErrors({});
    } else {
      setLoginErrors(errors);
      addNotification("Please fix the errors in the form");
    }
  };

  // Handle signup form changes
  const handleSignupFormChange = (field, value) => {
    setSignupForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (signupErrors[field]) {
      setSignupErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateSignupForm();
    
    if (Object.keys(errors).length === 0) {
      handleLogin(signupForm.fullName);
      setSignupForm({ fullName: "", email: "", password: "", confirmPassword: "" });
      setSignupErrors({});
    } else {
      setSignupErrors(errors);
      addNotification("Please fix the errors in the form");
    }
  };

  // Handle patient data updates
  const handlePatientChange = (field, value) => {
    setPatient(prev => ({
      ...prev,
      [field]: field === "age" ? parseInt(value) || "" : value
    }));
    // Clear error when user modifies field
    if (patientErrors[field]) {
      setPatientErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle vitals updates and recalculate status
  const handleVitalsChange = (field, value) => {
    const numValue = field === "bloodPressure" ? value : parseFloat(value) || "";
    
    const newVitals = {
      ...vitals,
      [field]: numValue
    };
    
    // Update system status based on vitals if they're valid
    if (typeof numValue === "number") {
      const status = calculateVitalStatus(newVitals);
      newVitals.status = status;
    }
    
    setVitals(newVitals);
    
    // Clear error when user modifies field
    if (vitalErrors[field]) {
      setVitalErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Calculate system status based on vital readings
  const calculateVitalStatus = (vitalData) => {
    const temp = vitalData.temperature;
    const pulse = vitalData.pulseRate;
    
    if (temp < 36 || temp > 38 || pulse < 60 || pulse > 100) {
      return "Warning";
    }
    return "Normal";
  };

  // Queue management - Call next patient
  const handleCallNextPatient = () => {
    if (queueNumber < systemSettings.maxQueueSize && queueStatus === "Active") {
      setQueueNumber(prev => prev + 1);
      addNotification(`Calling Queue ${queueNumber + 1}`);
    } else if (queueNumber >= systemSettings.maxQueueSize) {
      addNotification("Queue limit reached");
    }
  };

  // Register new patient and add to recent list
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
      
      // Reset form
      setPatient({
        id: "",
        name: "",
        age: "",
        sex: "Male",
        contact: ""
      });
    } else {
      setPatientErrors(errors);
      addNotification("Please fix the errors in the patient form");
    }
  };

  // Handle vitals form submission
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

  // Remove patient from recent list
  const handleRemovePatient = (patientId) => {
    setRecentPatients(prev => prev.filter(p => p.id !== patientId));
    addNotification("Patient removed from recent list");
  };

  // Toggle queue status
  const handleToggleQueueStatus = () => {
    const newStatus = queueStatus === "Active" ? "Closed" : "Active";
    setQueueStatus(newStatus);
    addNotification(`Queue status changed to: ${newStatus}`);
  };

  // Handle settings form changes
  const handleSettingsChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: field === "maxQueueSize" ? parseInt(value) : value
    }));
    // Clear error when user modifies field
    if (settingsErrors[field]) {
      setSettingsErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validate and submit settings
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!systemSettings.clinicName) {
      errors.clinicName = "Clinic name is required";
    }
    if (!systemSettings.workingHours) {
      errors.workingHours = "Working hours are required";
    }
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

  // Toggle boolean settings
  const handleToggleSetting = (setting) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Add notification to list
  const addNotification = (message) => {
    const id = ++notificationIdRef.current;
    setNotifications(prev => [...prev, { id, message }]);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Handle authentication
  const handleLogin = (fullName) => {
    setCurrentUser({ name: fullName, role: "Admin", loginTime: new Date().toLocaleTimeString() });
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    addNotification(`Welcome, ${fullName}!`);
  };

  // ========================
  // NAVIGATION HANDLERS
  // ========================

  // Navigate to a specific page
  const handleNavigate = (page) => {
    setCurrentPage(page);
    addNotification(`Navigated to ${page.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };

  // Navigate to patient monitoring with selected patient
  const handleViewPatient = (patientId) => {
    setSelectedPatientId(patientId);
    setCurrentPage("patientMonitoring");
    const patient = recentPatients.find(p => p.id === patientId);
    if (patient) {
      addNotification(`Viewing patient: ${patient.name}`);
    }
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedPatientId(null);
  };

  // Get selected patient data
  const getSelectedPatient = () => {
    if (!selectedPatientId) return null;
    return recentPatients.find(p => p.id === selectedPatientId);
  };

  return (
    <>
      <Header />

      {!isAuthenticated ? (
        // -------------------------
        // LOGIN / SIGNUP SCREEN
        // -------------------------
        <div className="auth-container">

          <div className="auth-tabs">
            <button 
              className={activeTab === "login" ? "active" : ""} 
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button 
              className={activeTab === "signup" ? "active" : ""} 
              onClick={() => setActiveTab("signup")}
            >
              Signup
            </button>
          </div>

          {activeTab === "login" && (
            <form className="auth-box" onSubmit={handleLoginSubmit}>
              <h2>Admin Login</h2>
              
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => handleLoginFormChange("email", e.target.value)}
                  className={loginErrors.email ? "input-error" : ""}
                />
                {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => handleLoginFormChange("password", e.target.value)}
                  className={loginErrors.password ? "input-error" : ""}
                />
                {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
              </div>
              
              <button type="submit" className="btn-submit">
                Login
              </button>
            </form>
          )}

          {activeTab === "signup" && (
            <form className="auth-box" onSubmit={handleSignupSubmit}>
              <h2>Create Admin Account</h2>
              
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={signupForm.fullName}
                  onChange={(e) => handleSignupFormChange("fullName", e.target.value)}
                  className={signupErrors.fullName ? "input-error" : ""}
                />
                {signupErrors.fullName && <span className="error-message">{signupErrors.fullName}</span>}
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) => handleSignupFormChange("email", e.target.value)}
                  className={signupErrors.email ? "input-error" : ""}
                />
                {signupErrors.email && <span className="error-message">{signupErrors.email}</span>}
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={(e) => handleSignupFormChange("password", e.target.value)}
                  className={signupErrors.password ? "input-error" : ""}
                />
                {signupErrors.password && <span className="error-message">{signupErrors.password}</span>}
              </div>
              
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => handleSignupFormChange("confirmPassword", e.target.value)}
                  className={signupErrors.confirmPassword ? "input-error" : ""}
                />
                {signupErrors.confirmPassword && <span className="error-message">{signupErrors.confirmPassword}</span>}
              </div>
              
              <button type="submit" className="btn-submit">
                Signup
              </button>
            </form>
          )}

        </div>

      ) : (
        // ========================
        // AUTHENTICATED DASHBOARD WITH NAVIGATION
        // ========================
        <div className="dashboard-wrapper">

          {/* NAVIGATION NAVBAR */}
          <nav className="navbar">
            <div className="nav-items">
              <button 
                className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
                onClick={() => handleNavigate("dashboard")}
              >
                Dashboard
              </button>
              <button 
                className={`nav-link ${currentPage === "patientMonitoring" ? "active" : ""}`}
                onClick={() => handleNavigate("patientMonitoring")}
              >
                Patients
              </button>
              <button 
                className={`nav-link ${currentPage === "queueManagement" ? "active" : ""}`}
                onClick={() => handleNavigate("queueManagement")}
              >
                Queue
              </button>
              <button 
                className={`nav-link ${currentPage === "reports" ? "active" : ""}`}
                onClick={() => handleNavigate("reports")}
              >
                Reports
              </button>
              <button 
                className={`nav-link ${currentPage === "settings" ? "active" : ""}`}
                onClick={() => handleNavigate("settings")}
              >
                Settings
              </button>
            </div>

            <div className="navbar-right">
              <div className="user-section">
                <span className="user-name">{currentUser?.name}</span>
                <span className="user-role">{currentUser?.role}</span>
              </div>
              <button 
                className="logout-btn-nav"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsAuthenticated(false); 
                  setCurrentUser(null);
                  setCurrentPage("dashboard");
                  addNotification("Signed out successfully");
                }}
              >
                Sign Out
              </button>
            </div>
          </nav>

          {/* SIDEBAR NAVIGATION */}
          <aside style={{display: 'none'}}></aside>

          {/* MAIN CONTENT AREA */}
          <main className="dashboard-content">

            {/* Notifications */}
            <div className="notifications-container">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification">
                  {notif.message}
                </div>
              ))}
            </div>

            {/* ============================== */}
            {/* PAGE: DASHBOARD */}
            {/* ============================== */}
            {currentPage === "dashboard" && (
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

                {/* Patient Registration Form */}
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

                {/* Recent Patients List */}
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
            )}

            {/* ============================== */}
            {/* PAGE: PATIENT MONITORING */}
            {/* ============================== */}
            {currentPage === "patientMonitoring" && (
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
            )}

            {/* ============================== */}
            {/* PAGE: QUEUE MANAGEMENT */}
            {/* ============================== */}
            {currentPage === "queueManagement" && (
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
            )}

            {/* ============================== */}
            {/* PAGE: SETTINGS */}
            {/* ============================== */}
            {currentPage === "settings" && (
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
                        <input 
                          type="checkbox"
                          checked={systemSettings.darkMode}
                          onChange={() => handleToggleSetting("darkMode")}
                        />
                      </div>
                      <div className="toggle-item">
                        <label>Sound Notifications</label>
                        <input 
                          type="checkbox"
                          checked={systemSettings.soundNotifications}
                          onChange={() => handleToggleSetting("soundNotifications")}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-submit primary">
                      Save Settings
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
            )}

            {/* ============================== */}
            {/* PAGE: REPORTS & ANALYTICS */}
            {/* ============================== */}
            {currentPage === "reports" && (
              <div className="page-content">
                <section className="card card-full">
                  <h2>System Reports & Analytics</h2>
                  <div className="analytics-grid">
                    <div className="analytics-card">
                      <h3>Total Patients Registered</h3>
                      <div className="analytics-value">{recentPatients.length}</div>
                      <p className="analytics-subtitle">This session</p>
                    </div>
                    <div className="analytics-card">
                      <h3>Current Queue Position</h3>
                      <div className="analytics-value">{queueNumber}</div>
                      <p className="analytics-subtitle">Next: #{queueNumber + 1}</p>
                    </div>
                    <div className="analytics-card">
                      <h3>Queue Capacity</h3>
                      <div className="analytics-value">{Math.round((queueNumber / systemSettings.maxQueueSize) * 100)}%</div>
                      <p className="analytics-subtitle">of {systemSettings.maxQueueSize}</p>
                    </div>
                    <div className={`analytics-card status-${vitals.status.toLowerCase()}`}>
                      <h3>Last Vitals Status</h3>
                      <div className="analytics-value">{vitals.status}</div>
                      <p className="analytics-subtitle">Patient health indicator</p>
                    </div>
                  </div>
                </section>

                <section className="card">
                  <h2>Patient Session Summary</h2>
                  <div className="summary-table">
                    <div className="summary-row header">
                      <div className="summary-col">Patient Name</div>
                      <div className="summary-col">Registration Time</div>
                      <div className="summary-col">Status</div>
                    </div>
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="summary-row">
                        <div className="summary-col">{patient.name}</div>
                        <div className="summary-col">{patient.registeredAt}</div>
                        <div className="summary-col"><span className="badge">Registered</span></div>
                      </div>
                    ))}
                    {recentPatients.length === 0 && (
                      <div className="summary-row empty">
                        <div className="summary-col" style={{gridColumn: "1 / -1"}}>No patients registered yet</div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="card">
                  <h2>System Status Overview</h2>
                  <div className="status-overview">
                    <div className="status-row">
                      <span className="status-name">Queue System:</span>
                      <span className={`status-badge ${queueStatus.toLowerCase()}`}>{queueStatus}</span>
                    </div>
                    <div className="status-row">
                      <span className="status-name">Last Vitals Reading:</span>
                      <span className={`status-badge ${vitals.status.toLowerCase()}`}>{vitals.status}</span>
                    </div>
                    <div className="status-row">
                      <span className="status-name">Clinic Name:</span>
                      <span className="status-value">{systemSettings.clinicName}</span>
                    </div>
                    <div className="status-row">
                      <span className="status-name">Operating Hours:</span>
                      <span className="status-value">{systemSettings.workingHours}</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

          </main>
        </div>
      )}

      <footer>
        <p>© 2026 QuickCare Healthcare System</p>
      </footer>
    </>
  );
}

export default App;
