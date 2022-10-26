export enum KeyboardItemType {
  DIGIT = 'DIGIT',
  OPERATOR = 'OPERATOR',
  FUNCTION = 'FUNCTION',
  ERASE = 'ERASE',
  DOT = 'DOT',
  ERASE_ALL = 'ERASE_ALL',
  BRACKET = 'BRACKET',
  EQUAL = 'EQUAL',
  ARROW = 'ARROW',
  PI = 'PI'
}


export interface KeyboardItem {
  type: KeyboardItemType
  value: string | number
}
