import { useState } from "react";

export function useUserHandlers(addNotification) {
  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah.johnson@clinic.com", role: "Doctor", requestedAt: "2:15 PM", status: "pending" },
    { id: 2, name: "Nurse Maria Gonzales", email: "maria.gonzales@clinic.com", role: "Nurse", requestedAt: "1:50 PM", status: "pending" },
    { id: 3, name: "Admin Tech Support", email: "tech.support@clinic.com", role: "Admin", requestedAt: "1:20 PM", status: "pending" }
  ]);
  const [approvedUsers, setApprovedUsers] = useState([
    { id: 101, name: "Admin User", email: "admin@clinic.com", role: "Admin", approvedAt: "Today" }
  ]);

  const handleAcceptUser = (userId) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setApprovedUsers(prev => [...prev, { ...user, approvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: "approved" }]);
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      addNotification(`User ${user.name} has been approved!`);
    }
  };

  const handleDeclineUser = (userId) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
      addNotification(`User ${user.name} has been declined`);
    }
  };

  const handleRemoveApprovedUser = (userId) => {
    const user = approvedUsers.find(u => u.id === userId);
    if (user) {
      setApprovedUsers(prev => prev.filter(u => u.id !== userId));
      addNotification(`User ${user.name} has been removed`);
    }
  };

  return {
    pendingUsers,
    approvedUsers,
    handleAcceptUser,
    handleDeclineUser,
    handleRemoveApprovedUser
  };
}
