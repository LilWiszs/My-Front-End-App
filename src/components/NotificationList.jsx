import React from "react";

export default function NotificationList({ notifications }) {
  return (
    <div className="notifications-container">
      {notifications.map((notif) => (
        <div key={notif.id} className="notification">
          {notif.message}
        </div>
      ))}
    </div>
  );
}
