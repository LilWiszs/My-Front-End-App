import React from "react";

export default function Users({
  pendingUsers,
  approvedUsers,
  handleAcceptUser,
  handleDeclineUser,
  handleRemoveApprovedUser
}) {
  return (
    <div className="page-content">
      <section className="card card-full">
        <h2>User Management System</h2>
        <div className="users-summary">
          <div className="summary-stat">
            <span className="stat-label">Pending Requests</span>
            <span className="stat-value pending">{pendingUsers.length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Approved Users</span>
            <span className="stat-value approved">{approvedUsers.length}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{pendingUsers.length + approvedUsers.length}</span>
          </div>
        </div>
      </section>

      {/* Pending User Requests */}
      <section className="card">
        <h2>Pending User Requests</h2>
        {pendingUsers.length > 0 ? (
          <div className="users-request-list">
            {pendingUsers.map((user) => (
              <div key={user.id} className="user-request-item">
                <div className="user-request-info">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-meta"><strong>Role:</strong> {user.role} | <strong>Requested:</strong> {user.requestedAt}</p>
                </div>
                <div className="user-request-actions">
                  <button 
                    onClick={() => handleAcceptUser(user.id)}
                    className="btn-accept"
                  >
                    ✓ Accept
                  </button>
                  <button 
                    onClick={() => handleDeclineUser(user.id)}
                    className="btn-decline"
                  >
                    ✗ Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No pending user requests</p>
        )}
      </section>

      {/* Approved Users */}
      <section className="card">
        <h2>Approved Users</h2>
        {approvedUsers.length > 0 ? (
          <div className="users-approved-list">
            {approvedUsers.map((user) => (
              <div key={user.id} className="user-approved-item">
                <div className="user-approved-info">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-meta"><strong>Role:</strong> {user.role} | <strong>Approved:</strong> {user.approvedAt}</p>
                </div>
                <div className="user-approved-status">
                  <span className="status-badge approved">✓ Approved</span>
                  {user.id !== 101 && (
                    <button 
                      onClick={() => handleRemoveApprovedUser(user.id)}
                      className="btn-remove-user"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No approved users</p>
        )}
      </section>
    </div>
  );
}
