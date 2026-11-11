import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar';

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
                <div className="App relative min-h-screen w-full">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
