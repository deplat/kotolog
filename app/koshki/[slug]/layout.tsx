export default function CatPageLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className='min-h-screen' style={{backgroundColor: "#F5F7FA"}}>
            <header
                className="h-72 border-t-4 border-b-2 bg-white"
                style={{borderColor: "#CBD2D9", borderTopColor: "#F35627"}}
            >
            </header>
            {children}
            <footer
                className="border-b-4 border-t-2 bg-white"
                style={{borderColor: "#CBD2D9", borderBottomColor: "#F35627"}}
            >
                <div className="flex h-24 justify-center">
                    <span className='my-auto'>&copy; 2024 Все права защищены.</span>
                </div>
            </footer>
        </section>
    )
}