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
  PI = 'PI',
  ADDITIONAL = 'ADDITIONAL',
  COS = 'COS',
  SIN = 'SIN',
  TAN = 'TAN',
  LOG = 'LOG',
  E = 'E',
  SQRT = 'SQRT',
  FACTORIAL = 'FACTORIAL'
}


export interface KeyboardItem {
  type: KeyboardItemType
  shownValue: string | number
  actualValue: string | number | null
  length: number | null
}
