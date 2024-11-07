export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          <h3>Explorer</h3>
        </div>
        <nav className="flex flex-col border border-stone-700"></nav>
        <div>{children}</div>
      </div>
    </>
  )
}
