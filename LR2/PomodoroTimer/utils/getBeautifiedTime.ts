export const getBeautifiedTime = (date: Date): string => `${date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()}`
