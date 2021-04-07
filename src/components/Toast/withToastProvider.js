import React, { useState, useMemo } from "react";
import ToastContext from "./toast-context";
import { createPortal } from 'react-dom';
import Toast from "./Toast";

function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ('000' + first.toString(36)).slice(-3);
    second = ('000' + second.toString(36)).slice(-3);

    return first + second;
}

function withToastProvider(Component) {
    function WithToastProvider(props) {
        const [toasts, setToasts] = useState([]);

        const add = newToast => {
            const id = generateUEID();
            console.log(toasts);
            setToasts([ ...toasts, { id, ...newToast } ]);
        };

        const remove = id => setToasts(toasts.filter(t => t.id !== id));
        // const provideValue () => { return { add, remove } }, [ toasts ]);

        return (
            <ToastContext.Provider value={ { add, remove } }>
                <Component { ...props } />

                {   createPortal(
                        <div className="toastContainer">
                            {
                                toasts.map(t => (
                                    <Toast key={ t.id } remove={ () => remove(t.id) }>
                                        { t }
                                    </Toast>
                                ))
                            }
                        </div>,
                        document.body
                )   }
            </ToastContext.Provider>
        )
    }

    return WithToastProvider;
}

export default withToastProvider;
