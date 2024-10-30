/**
 * Takes an object with states as keys and an array of classes as values.
 *
 * Returns an array of strings where each string is a class in the format
 * `data-[STATE]:[CLASS]`.
 *
 * @example
 * stateClasses({
 *   open: ['bg-blue-500', 'text-white'],
 *   closed: ['bg-gray-500', 'text-black'],
 * })
 * // returns [
 * //   'data-open:bg-blue-500',
 * //   'data-open:text-white',
 * //   'data-closed:bg-gray-500',
 * //   'data-closed:text-black',
 * // ]
 */
export const stateClasses = (states: Record<string, string[]>) => {
  return Object.entries(states).flatMap(([state, classes]) =>
    classes.map((className) => `data-[${state}]:${className}`)
  )
}
