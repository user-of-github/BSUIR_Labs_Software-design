export const transformStringBeforeComputing = (source: string): string => {
  return source
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('^', '**')
}
