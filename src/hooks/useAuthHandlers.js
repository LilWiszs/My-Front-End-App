import { useState } from "react";

export function useAuthHandlers(addNotification) {
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupForm, setSignupForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [signupErrors, setSignupErrors] = useState({});

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

  const handleLoginFormChange = (field, value) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    if (loginErrors[field]) {
      setLoginErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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

  const handleSignupFormChange = (field, value) => {
    setSignupForm(prev => ({ ...prev, [field]: value }));
    if (signupErrors[field]) {
      setSignupErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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

  const handleLogin = (fullName) => {
    setCurrentUser({ name: fullName, role: "Admin", loginTime: new Date().toLocaleTimeString() });
    setIsAuthenticated(true);
    setActiveTab("login"); // Reset tab for next login/logout cycle
    addNotification(`Welcome, ${fullName}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    addNotification("Signed out successfully");
  };

  return {
    activeTab,
    setActiveTab,
    isAuthenticated,
    currentUser,
    loginForm,
    loginErrors,
    signupForm,
    signupErrors,
    handleLoginFormChange,
    handleLoginSubmit,
    handleSignupFormChange,
    handleSignupSubmit,
    handleLogout
  };
}
