import React, { createContext, useState, useRef, useEffect } from 'react';

export const ErrorContext = createContext();

function ErrorNotificationProvider({ children }) {
    const notificationTime = 5000;
    const [errorMessage, setErrorMessage] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const notifyUserErrors = (message) => {
        setErrorMessage(message);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setErrorMessage("");
        }, notificationTime);
    }

    return (
        <ErrorContext.Provider value={notifyUserErrors}>
            {children}
            {errorMessage !== "" &&
                <div className='fixed top-[10%] left-1/4 right-1/4 shadow-md bg-gradient-to-r from-red-600 to-red-50 '>
                    <p className='text-l text-red-600 text-center'>{errorMessage}</p>
                </div>}
        </ErrorContext.Provider>
    );
}

export default ErrorNotificationProvider;
