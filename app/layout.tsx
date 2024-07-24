import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
const inter = Inter({subsets: ["cyrillic"]});

export const metadata: Metadata = {
    title: {
        template: '%s | kotolog',
        default: 'kotolog',
    },
    description: 'next.js kotolog app',
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <main className="bg-gray-50 h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}
