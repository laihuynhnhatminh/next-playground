'use client';

import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import 'katex/dist/katex.min.css';

import { ThemeProvider, useTheme } from 'next-themes';
import { createContext, type ReactNode } from 'react';
import { Toaster } from 'sonner';

import useLocalStorage from '@/hooks/use-local-storage';

export const AppContext = createContext<{
  font: string;
  setFont: (value: string) => void;
}>({
  font: 'Default',
  setFont: () => {},
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: 'light' | 'dark' | 'system';
  };
  return <Toaster theme={theme} />;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>('novel__font', 'Default');

  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      defaultTheme="system"
    >
      <AppContext.Provider
        value={{
          font,
          setFont,
        }}
      >
        <ToasterProvider />
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
}
