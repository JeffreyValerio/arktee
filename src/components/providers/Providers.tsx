import { ToastProvider } from "./ToastifyContext";
import { PWAProvider } from "./PWAProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            <PWAProvider>
                {children}
            </PWAProvider>
        </ToastProvider>
    );
} 