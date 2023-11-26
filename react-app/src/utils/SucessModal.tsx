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
    <div className="modal fade" id="successModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Success!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            Your action was successful.
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};
