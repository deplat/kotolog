export default function CatPageLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section style={{backgroundColor: "#F5F7FA"}}>
            <header
                className="w-screen h-72 border-t-4 border-b-2 bg-white"
                style={{borderColor: "#CBD2D9", borderTopColor: "#F35627"}}
            >
            </header>
            {children}
        </section>
    )
}