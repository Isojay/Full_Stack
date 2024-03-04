import React from 'react';

const ServerError: React.FC = () => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-75">
            <div className="text-center">
                <h1 className="display-1 fw-bold">500</h1>
                <p className="fs-3">
                    <span className="text-danger">Oops!</span> Internal Server Error.
                </p>
                <p className="lead">Something went wrong on our end. Please try again later.</p>
                <button className="btn btn-primary" onClick={reloadPage}>Reload Page</button>
            </div>
        </div>
    );
};

export default ServerError;
