import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["cyrillic"]});

export const metadata: Metadata = {
    title: {
        template: '%s | КОТОЛОГ',
        default: 'КОТОЛОГ',
    },
    description: 'Shelter app, written with NextJs',
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={inter.className} style={{backgroundColor: "#F5F7FA"}}>
        <main className="min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}
