export const createStateStyles = (state: string, classnames: string[]) => {
  return classnames.map((classname: string) => `${state}:${classname}`).join(' ')
}
