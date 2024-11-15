import clsx from 'clsx'

export const Sidebar = ({
  children,
  showSidebar,
}: {
  children: React.ReactNode
  showSidebar: boolean
}) => {
  return (
    <div
      className={clsx(
        'fixed bottom-0 right-0 top-0 z-50 flex flex-col justify-between overflow-auto bg-stone-50 px-4 py-3 text-stone-800 ring-1 ring-gray-300/85 transition-all',
        'w-fit min-w-64 sm:rounded-l sm:shadow-lg lg:w-1/4',
        'dark:bg-gray-900 dark:text-stone-100 dark:ring-gray-300/15',
        !showSidebar && 'translate-x-full'
      )}
    >
      {children}
    </div>
  )
}
