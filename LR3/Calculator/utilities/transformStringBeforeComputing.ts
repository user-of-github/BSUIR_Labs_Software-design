const PI: string = 'PI'


export const transformStringBeforeComputing = (source: string): string => {
  return source
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('^', '^')
    .replaceAll('π', PI)
    .replaceAll('ln', 'log')
}
