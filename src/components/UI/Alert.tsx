import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface AlertProps {
    type: 'success' | 'error';
    message: string;
    onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const styles = {
        success: {
            container: 'bg-green-50 border-green-200 text-green-800',
            icon: <CheckCircle role='img' aria-label='success-icon' className="h-5 w-5 text-green-400" />,
        },
        error: {
            container: 'bg-red-50 border-red-200 text-red-800',
            icon: <AlertCircle role='img' aria-label='error-icon' className="h-5 w-5 text-red-400" />,
        },
    };

    return (
        <div className={`rounded-md border p-4 ${styles[type].container}`}>
            <div className="flex">
                <div className="flex-shrink-0">{styles[type].icon}</div>
                <div className="ml-3">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                {onClose && (
                    <div className="ml-auto pl-3">
                        <button
                            onClick={onClose}
                            className="inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alert;
