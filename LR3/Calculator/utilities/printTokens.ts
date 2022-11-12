import { KeyboardItem } from '../types/KeyboardItem'


export const printTokens = (tokens: Array<KeyboardItem>): void => {
  console.log(tokens.map(t => t.type).join('|'))
}
