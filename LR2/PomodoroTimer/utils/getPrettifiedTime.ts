export const getPrettifiedTime = (seconds: number): [number, number] => [Math.floor(seconds / 60), seconds % 60]
