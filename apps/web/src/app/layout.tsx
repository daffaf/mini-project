import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from './providers';
import StoreProvider from '@/components/MainComponent/StoreProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            closeOnClick
            draggable
          />
        </Providers>

      </body>
    </html>
  );
}
