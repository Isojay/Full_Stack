import * as bootstrap from "bootstrap";
import { useEffect, useState } from "react";


// import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface LogOutModalProps {
  onClose: () => void;
  onOkay: () => void;
  from: string;
}

export const LogOutModal: React.FC<LogOutModalProps> = ({ onClose, onOkay, from }) => {
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const modalElement = document.getElementById("LogOutModal");

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

    if (from === "logOut") {
      setNotice("Do you Wanna Log Out??");
    }
  }, [from]);

  const modalTitle = "Log Out!";
  const buttonTextOkay = "Okay";
  const buttonTextCancel = "Cancel";

  return (
      <div className="modal fade" id="LogOutModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">


              <FontAwesomeIcon icon={faSignOutAlt} size="7x" />

              <h5 className="modal-title mb-3" id="exampleModalLabel">
                {modalTitle}
              </h5>

              <p>{notice}</p>
              <button type="button" className="btn btn-danger m-2" data-bs-dismiss="modal" onClick={onOkay}>
                {buttonTextOkay}
              </button>
              <button type="button" className="btn btn-secondary m-2" data-bs-dismiss="modal" onClick={onClose}>
                {buttonTextCancel}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};