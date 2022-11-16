import { KeyboardItemType } from '../types/KeyboardItem'


export const isKeyItemInsertable = (keyItem: KeyboardItemType): boolean =>
  keyItem == KeyboardItemType.DOT
  || keyItem === KeyboardItemType.DIGIT
  || keyItem === KeyboardItemType.OPERATOR
  || keyItem === KeyboardItemType.BRACKET
  || keyItem === KeyboardItemType.PI
  || keyItem === KeyboardItemType.COS
  || keyItem === KeyboardItemType.SIN
  || keyItem === KeyboardItemType.TAN
  || keyItem === KeyboardItemType.LOG
  || keyItem === KeyboardItemType.SQRT
  || keyItem === KeyboardItemType.E
  || keyItem === KeyboardItemType.FACTORIAL


export const requiresAutoClosingBracket = (keyItem: KeyboardItemType): boolean =>
  keyItem === KeyboardItemType.COS
  || keyItem === KeyboardItemType.SIN
  || keyItem === KeyboardItemType.TAN
  || keyItem === KeyboardItemType.SQRT
  || keyItem === KeyboardItemType.LOG
  || keyItem === KeyboardItemType.FACTORIAL


export const isArrowItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ARROW

export const isEraseItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ERASE || keyItem === KeyboardItemType.ERASE_ALL

export const isOperationSign = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.OPERATOR


export const isBracket = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.BRACKET


export const isConstant = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.E || keyItem === KeyboardItemType.PI


export const isDigit = (item: string): boolean => {
  return item === '0' || item === '1' || item === '2' || item === '3' || item === '4' || item === '5' || item === '6' || item === '7' || item === '8' || item === '9' || item === '0'
}
