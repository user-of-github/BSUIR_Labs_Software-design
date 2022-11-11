import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'
import React from 'react'
import {
  isArrowItem,
  isBracket,
  isEraseItem,
  isKeyItemInsertable,
  isOperationSign,
  requiresAutoClosingBracket,
} from './defineKeyItemType'

/*
const defineIndexInTokensArray = (tokensArray: Array<KeyboardItem>, realCharPosition: number): number => {
  let sum: number = 0
  let index: number = -1

  while (sum < realCharPosition && index < tokensArray.length) {
    ++index
    //console.log(tokensArray)
    if (index >= tokensArray.length) break
    sum += tokensArray[index].length as number
  }

  return Math.max(0, index)
}
*/

const isNewCharacterAcceptable = (potentialNew: KeyboardItem, previous: KeyboardItem): boolean => {
  if (previous === undefined && isBracket(potentialNew.type) && potentialNew.actualValue === ')') return false

  if (previous === undefined && isOperationSign(potentialNew.type) && potentialNew.actualValue !== '-') return false

  if (previous === undefined) return true

  if (isOperationSign(previous.type) && isOperationSign(potentialNew.type)) return false

  if (isBracket(previous.type) && isBracket(potentialNew.type) && previous.actualValue === '(' &&
    potentialNew.actualValue === ')') return false

  if (isBracket(previous.type) && previous.actualValue === '(' && isOperationSign(potentialNew.type) &&
    potentialNew.actualValue !== '-') return false

  if (previous.type === KeyboardItemType.PI && potentialNew.type === KeyboardItemType.PI) return false


  return true
}


const arrowItemPressed = (current: string, cursorPosition: number, keyItem: KeyboardItem,
                          tokensArray: Array<KeyboardItem>,
                          indexInTokensArray: React.MutableRefObject<number>): number => {
  if (!isArrowItem(keyItem.type)) return cursorPosition

  const tokenIndex: number = indexInTokensArray.current

  if (keyItem.shownValue === '←') {
    if (indexInTokensArray.current > -1) {
      --indexInTokensArray.current
      return cursorPosition - tokensArray[tokenIndex].length! >= 0
        ? cursorPosition - tokensArray[tokenIndex].length! : cursorPosition
    }
    return cursorPosition
  }

  // else //if (keyItem.value === '→')
  if (tokenIndex !== tokensArray.length - 1) {
    ++indexInTokensArray.current
    return cursorPosition + tokensArray[tokenIndex + 1].length! <= current.length
      ? cursorPosition + tokensArray[tokenIndex + 1].length! : cursorPosition
  } else
    return cursorPosition
}

const insertableItemPressed = (current: string, cursorPosition: number,
                               keyItem: KeyboardItem, tokens: Array<KeyboardItem>,
                               tokenIndex: React.MutableRefObject<number>): [string, number] => {
  if (!isKeyItemInsertable(keyItem.type)) return [current, cursorPosition]

  const previousItem: KeyboardItem | undefined = tokens[tokenIndex.current]
  const canInsertSuchItem: boolean = isNewCharacterAcceptable(keyItem, previousItem)

  if (!canInsertSuchItem) return [current, cursorPosition]


  let newValue: string
  const newToken: Array<KeyboardItem> = [keyItem]

  if (requiresAutoClosingBracket(keyItem.type)) {
    newValue = current.slice(0, cursorPosition) + keyItem.actualValue + ')' + current.slice(cursorPosition)
    newToken.push({ type: KeyboardItemType.BRACKET, shownValue: ')', length: 1, actualValue: ')' })
  } else {
    newValue = current.slice(0, cursorPosition) + keyItem.actualValue + current.slice(cursorPosition)
  }

  tokens.splice(tokenIndex.current + 1, 0, ...newToken)
  ++tokenIndex.current

  return [newValue, cursorPosition + keyItem.length! as number]
}

const eraseItemPressed = (current: string, cursorPosition: number,
                          keyItem: KeyboardItem, tokens: Array<KeyboardItem>,
                          tokenIndex: React.MutableRefObject<number>): [string, number] => {

  if (!isEraseItem(keyItem.type)) return [current, cursorPosition]

  if (keyItem.type === KeyboardItemType.ERASE_ALL) {
    tokens.length = 0
    tokenIndex.current = -1
    return ['', 0]
  }

  const indexInTokensArray: number = tokenIndex.current

  if (indexInTokensArray === -1) return [current, cursorPosition]

  const moveToLeft: number = tokens[indexInTokensArray].length!

  --tokenIndex.current
  tokens.splice(indexInTokensArray, 1)

  if (current.length === 0) return [current, cursorPosition]
  const leftString: string = current.slice(0, cursorPosition - moveToLeft)
  const rightString: string = current.slice(cursorPosition)

  return [leftString + rightString, cursorPosition - moveToLeft]
}

export const keyboardItemPressed = (current: string, cursorPosition: number, keyItem: KeyboardItem,
                                    tokensArray: Array<KeyboardItem>,
                                    indexInTokens: React.MutableRefObject<number>): [string, number] => {

  if (isArrowItem(keyItem.type))
    return [current, arrowItemPressed(current, cursorPosition, keyItem, tokensArray, indexInTokens)]

  if (isKeyItemInsertable(keyItem.type))
    return insertableItemPressed(current, cursorPosition, keyItem, tokensArray, indexInTokens)

  if (isEraseItem(keyItem.type))
    return eraseItemPressed(current, cursorPosition, keyItem, tokensArray, indexInTokens)


  return [current, cursorPosition]
}
