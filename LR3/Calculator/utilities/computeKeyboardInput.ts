import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'


const computeChangeCursorKeyPress = (current: string, cursorPosition: number, keyItem: KeyboardItem): number => {
  if (keyItem.type !== KeyboardItemType.ARROW) return cursorPosition

  if (keyItem.shownValue === '←')
    return cursorPosition - 1 >= 0 ? cursorPosition - 1 : cursorPosition
  else //if (keyItem.value === '→')
    return cursorPosition + 1 <= current.length ? cursorPosition + 1 : cursorPosition
}

const computeInsertNewItemKeyPress = (current: string, cursorPosition: number,
                                      keyItem: KeyboardItem): [string, number] => {
  if (keyItem.type !== KeyboardItemType.DOT
    && keyItem.type !== KeyboardItemType.DIGIT
    && keyItem.type !== KeyboardItemType.OPERATOR
    && keyItem.type !== KeyboardItemType.BRACKET
    && keyItem.type !== KeyboardItemType.PI
    && keyItem.type !== KeyboardItemType.COS
    && keyItem.type !== KeyboardItemType.SIN
    && keyItem.type !== KeyboardItemType.TAN) return [current, cursorPosition]

  const newValue: string = current.slice(0, cursorPosition) + keyItem.actualValue + current.slice(cursorPosition)
  //cursorPositionUpdater((a: any) => cursorPosition + 1)
  return [newValue, cursorPosition + keyItem.length! as number]
}

const computeEraseKeyPress = (current: string, cursorPosition: number,
                              keyItem: KeyboardItem): [string, number] => {
  if (keyItem.type !== KeyboardItemType.ERASE) return [current, cursorPosition]

  if (current.length === 0) return [current, cursorPosition]
  const leftString: string = current.slice(0, cursorPosition)
  const rightString: string = current.slice(cursorPosition)

  if (leftString.length !== 0) return [leftString.slice(0, -1) + rightString, cursorPosition - 1]
  else return [current, cursorPosition]
}

export const computeKeyboardInput = (current: string, cursorPosition: number,
                                     keyItem: KeyboardItem): [string, number] => {
  if (keyItem.type === KeyboardItemType.ARROW)
    return [current, computeChangeCursorKeyPress(current, cursorPosition, keyItem)]


  if (keyItem.type !== KeyboardItemType.ERASE && keyItem.type !==
    KeyboardItemType.ERASE_ALL) return computeInsertNewItemKeyPress(current, cursorPosition, keyItem)

  if (keyItem.type === KeyboardItemType.ERASE_ALL)
    return ['', 0]

  if (keyItem.type === KeyboardItemType.ERASE)
    return computeEraseKeyPress(current, cursorPosition, keyItem)


  return [current, cursorPosition]
}
