import React from 'react';

function ConfirmationModal({ isOpen, onClose, firstName, lastName, email, appointmentDate, appointmentTime }) {
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Appointment Confirmation</h2>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <p>Date: {appointmentDate} at {appointmentTime}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
