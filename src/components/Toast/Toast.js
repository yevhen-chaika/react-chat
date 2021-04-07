import './Toast.css';
import React, {useEffect, useRef} from "react";

const Toast = ({ children, remove }) => {
    const removeRef = useRef();
    removeRef.current = remove;

    useEffect(() => {
        const duration = 3000;
        const id = setTimeout(() => removeRef.current(), duration);

        return () => clearTimeout(id);
    });

    return (
        <div className="toastItem">
            <span><strong>{ children.userName }:</strong> { children.message }</span>
        </div>
    )
};

export default Toast;
