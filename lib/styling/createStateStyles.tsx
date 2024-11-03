import clsx from 'clsx'

export const createStateStyles = (states: Record<string, string[]>) => {
  return clsx(
    Object.entries(states).flatMap(([state, classes]) =>
      classes.map((className) => `${state}:${className}`)
    )
  )
}
