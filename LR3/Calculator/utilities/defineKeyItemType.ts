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
  || keyItem === KeyboardItemType.SINH


export const requiresAutoClosingBracket = (keyItem: KeyboardItemType): boolean =>
  keyItem === KeyboardItemType.COS
  || keyItem === KeyboardItemType.SIN
  || keyItem === KeyboardItemType.TAN
  || keyItem === KeyboardItemType.SQRT
  || keyItem === KeyboardItemType.LOG
  || keyItem === KeyboardItemType.SINH


export const isArrowItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ARROW

export const isEraseItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ERASE || keyItem === KeyboardItemType.ERASE_ALL

export const isOperationSign = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.OPERATOR


export const isBracket = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.BRACKET


export const isConstant = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.E || keyItem === KeyboardItemType.PI
