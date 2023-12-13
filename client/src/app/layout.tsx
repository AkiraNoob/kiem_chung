import UserContextProvider from '@/context/UserContext';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Melodify',
  description: 'Enjoy your music with Melodify',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <UserContextProvider>{children}</UserContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
