import React from "react";
import Alert from 'react-bootstrap/Alert'
import { BsFillExclamationTriangleFill, BsCheckCircleFill } from "react-icons/bs";

    const AlertMessage = ({error, notification, errorSearch, close}) => {
    
    return (
        <>
        { error && 
            <Alert variant="warning" onClose={close} dismissible>
                    <BsFillExclamationTriangleFill className="icon-bs me-2 mb-1"/>{error}
            </Alert>
        }
        { errorSearch && 
            <Alert variant="warning" onClose={close} dismissible>
                    <BsFillExclamationTriangleFill className="icon-bs me-2 mb-1"/>{errorSearch}
            </Alert>
        }
        { notification && 
            <Alert variant="success" onClose={close} dismissible>
                <BsCheckCircleFill className="icon-bs me-2 mb-1"/>{notification}
            </Alert>
        }
        </>
    );
}

export default AlertMessage;
