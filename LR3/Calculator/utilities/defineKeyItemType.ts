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


export const requiresAutoClosingBracket = (keyItem: KeyboardItemType): boolean =>
  keyItem === KeyboardItemType.COS
  || keyItem === KeyboardItemType.SIN
  || keyItem === KeyboardItemType.TAN


export const isArrowItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ARROW

export const isEraseItem = (keyItem: KeyboardItemType): boolean => keyItem === KeyboardItemType.ERASE || keyItem === KeyboardItemType.ERASE_ALL
