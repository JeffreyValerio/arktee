'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/register-sw';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
    </>
  );
}

