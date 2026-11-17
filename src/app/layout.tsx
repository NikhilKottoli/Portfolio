import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import NavBar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import { SoundProvider } from './components/SoundProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
    title: 'Nikhil Kottoli — Portfolio',
    description: 'Software developer. NITK Surathkal.',
    manifest: '/manifest.json',
    metadataBase: new URL(siteUrl),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: 'Nikhil Kottoli — Portfolio',
        title: 'Nikhil Kottoli — Portfolio',
        description: 'Software developer. NITK Surathkal.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nikhil Kottoli — Portfolio',
        description: 'Software developer. NITK Surathkal.',
    },
    robots: {
        index: true,
        follow: true,
    },
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
