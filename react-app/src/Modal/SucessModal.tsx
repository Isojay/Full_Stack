// SuccessModal.tsx
import * as bootstrap from 'bootstrap';
import { useEffect } from 'react';

interface SuccessModalProps {
  onClose: () => void;
  message : string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose , message }) => {
  useEffect(() => {
    // Use Bootstrap's JavaScript to open the modal on page load
    const modalElement = document.getElementById('successModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }, []);

  return (
      <div className="modal fade text-dark" id="successModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title" id="exampleModalLabel">Success!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body bg-light">
              <h3>{message}</h3>

              <p>Your action was successful.</p>

            </div>
            <div className="modal-footer bg-light border-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Okay</button>
            </div>
          </div>
        </div>
      </div>
  );
};