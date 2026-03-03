import React from "react";

export default function LoginPlaceholder({
  activeTab,
  setActiveTab,
  loginForm,
  loginErrors,
  handleLoginFormChange,
  handleLoginSubmit,
  signupForm,
  signupErrors,
  handleSignupFormChange,
  handleSignupSubmit
}) {
  return (
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
  );
}
