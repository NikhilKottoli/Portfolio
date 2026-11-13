import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import NavBar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import { SoundProvider } from './components/SoundProvider';

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
            <body className="min-h-screen w-full bg-parchment text-ink antialiased">
                <SoundProvider>
                    <div className="relative flex min-h-screen w-full flex-col">
                        <NavBar />
                        <div className="relative flex-1">{children}</div>
                        <SiteFooter />
                    </div>
                </SoundProvider>
            </body>
        </html>
    );
}
