'use client'
import React, { createContext, useContext } from 'react';
import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
    type?: ToastType;
    duration?: number;
    description?: string;
}

export const ToastContext = createContext<{
    showToast: (message: string, options?: ToastOptions) => void
}>({
    showToast: (message: string, options?: ToastOptions) => {
        console.log(message, options)
    }
});

export const useToaster = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToaster must be used within a ToastProvider')
    }
    return context
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const showToast = (message: string, options?: ToastOptions) => {
        const { type = 'info', duration = 5000, description } = options || {};
        
        switch (type) {
            case 'success':
                sonnerToast.success(message, {
                    duration,
                    description,
                });
                break;
            case 'error':
                sonnerToast.error(message, {
                    duration,
                    description,
                });
                break;
            case 'warning':
                sonnerToast.warning(message, {
                    duration,
                    description,
                });
                break;
            case 'info':
            default:
                sonnerToast.info(message, {
                    duration,
                    description,
                });
                break;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
};
