const PI: string = '3.141592653589793'

export const transformStringBeforeComputing = (source: string): string => {
  return source
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('^', '^')
    .replaceAll('π', PI)
}
