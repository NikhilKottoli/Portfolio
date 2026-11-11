import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import NavBar from './components/Navbar';
import WorldBackdrop from './components/WorldBackdrop';
import SiteFooter from './components/SiteFooter';

export const metadata: Metadata = {
    title: 'Nikhil Kottoli — Portfolio',
    description: 'Software developer. NITK Surathkal.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen w-full bg-void text-pale antialiased">
                <WorldBackdrop />
                <div className="App relative z-10 min-h-screen w-full">
                    <NavBar />
                    <div className="relative">{children}</div>
                    <SiteFooter />
                </div>
            </body>
        </html>
    );
}
