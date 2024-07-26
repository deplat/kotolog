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
        <main className="h-screen" style={{
            zIndex: -100,
            backgroundColor: "#F5F7FA"
        }}>
            <div
                className="w-screen h-72 border-t-4 border-b-2 bg-white"
                style={{borderColor: "#CBD2D9", borderTopColor: "#F35627"}}
            >
            </div>
            {children}
        </main>
        </body>
        </html>
    );
}
