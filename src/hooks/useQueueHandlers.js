import { useState } from "react";

export function useQueueHandlers(addNotification) {
  const [queueNumber, setQueueNumber] = useState(15);
  const [queueStatus, setQueueStatus] = useState("Inactive");

  const handleCallNextPatient = (systemSettings, maxQueueSize) => {
    if (queueNumber < maxQueueSize && queueStatus === "Active") {
      setQueueNumber(prev => prev + 1);
      addNotification(`Calling Queue ${queueNumber + 1}`);
    } else if (queueNumber >= maxQueueSize) {
      addNotification("Queue limit reached");
    }
  };

  const handleToggleQueueStatus = () => {
    const newStatus = queueStatus === "Active" ? "Closed" : "Active";
    setQueueStatus(newStatus);
    addNotification(`Queue status changed to: ${newStatus}`);
  };

  return {
    queueNumber,
    queueStatus,
    handleCallNextPatient,
    handleToggleQueueStatus
  };
}
