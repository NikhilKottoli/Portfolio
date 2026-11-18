import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import NavBar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import CommandPalette from './components/CommandPalette';
import { SoundProvider } from './components/SoundProvider';
import { JsonLd } from '../lib/json-ld';
import { personJsonLd, websiteJsonLd } from '../lib/structured-data';
import { getSiteUrl, SITE_NAME, SITE_DESCRIPTION } from '../lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: {
        default: SITE_NAME,
        template: '%s — Nikhil Kottoli',
    },
    description: SITE_DESCRIPTION,
    manifest: '/manifest.json',
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        images: [{ url: '/opengraph-image', alt: SITE_NAME }],
    },
    robots: {
        index: true,
        follow: true,
    },
    authors: [{ name: 'Nikhil Kottoli', url: siteUrl }],
    creator: 'Nikhil Kottoli',
    publisher: 'Nikhil Kottoli',
    category: 'technology',
    applicationName: SITE_NAME,
    keywords: [
        'software engineer',
        'systems programming',
        'distributed systems',
        'backend',
        'AI',
        'NITK',
        'portfolio',
    ],
    verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION || '',
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
                <CommandPalette />
                <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
            </body>
        </html>
    );
}
