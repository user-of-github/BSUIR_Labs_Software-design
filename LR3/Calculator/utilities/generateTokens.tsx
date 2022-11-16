import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'
import { isDigit } from './defineKeyItemType'


export const generateBlocks = (str: string, array: Array<KeyboardItem>): void => {
  array.length = 0

  for (let i: number = 0; i < str.length; ++i) {
    if (isDigit(str[i])) array.push({type: KeyboardItemType.DIGIT, shownValue: Number(str[i]), length: 1, actualValue: Number(str[i])})
    else if (str[i] === '.') array.push({type: KeyboardItemType.DOT, shownValue: '.', length: 1, actualValue: '.'})
  }
}
