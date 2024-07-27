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
        <body className={inter.className} style={{backgroundColor: "#F5F7FA"}}>
        <header
            className="w-screen h-72 border-t-4 border-b-2 bg-white"
            style={{borderColor: "#CBD2D9", borderTopColor: "#F35627"}}
        >
        </header>
        <main className="min-h-screen bg-main">
            {children}
        </main>
        <footer
            className="w-screen h-72 border-t-2 border-b-4 bg-white"
            style={{borderColor: "#CBD2D9", borderBottomColor: "#F35627"}}
        >
            <div className="flex justify-center h-full">
                <p className="my-auto">Footer, лол</p>
            </div>
        </footer>
        </body>
        </html>
    );
}
