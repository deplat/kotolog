import clsx from 'clsx'

export const createStateStyles = (states: { state: string; classnames: string[] }[]) => {
  return clsx(
    ...states.map(({ state, classnames }) => classnames.map((classname) => `${state}:${classname}`))
  )
}
