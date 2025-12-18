import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'My Portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#000000] w-full h-full text-black">
                <div className="App bg-[#000000] w-full min-h-screen">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
