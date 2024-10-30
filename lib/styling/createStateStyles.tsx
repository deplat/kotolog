import clsx from 'clsx'

/**
 * Given an object of state names to class names, returns a single class name string
 * that can be used to apply the classes conditionally.
 *
 * @example
 * const classnames = createStateStyles({
 *   open: ["bg-red-500", "text-white"],
 *   closed: ["bg-gray-100"],
 *   hover: ["outline-1", "outline-dashed", "outline-gray-500"],
 *   focus: ["ring-2", "ring-blue-500"],
 * })
 *
 * // classnames is now:
 * // "data-[open]:bg-red-500 data-[open]:text-white data-[closed]:bg-gray-100 data-[hover]:outline-1 data-[hover]:outline-dashed data-[hover]:outline-gray-500 data-[focus]:ring-2 data-[focus]:ring-blue-500"
 */
export const createStateStyles = (states: Record<string, string[]>) => {
  return clsx(
    Object.entries(states).flatMap(([state, classes]) =>
      classes.map((className) => `data-[${state}]:${className}`)
    )
  )
}
