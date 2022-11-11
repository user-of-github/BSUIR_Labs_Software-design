import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'


export const ADDITIONAL_KEYS: Array<KeyboardItem> = [
  {type: KeyboardItemType.COS, shownValue: 'cos', length: 4, actualValue: 'cos('},
  {type: KeyboardItemType.SIN, shownValue: 'sin', length: 4, actualValue: 'sin('},
  {type: KeyboardItemType.TAN, shownValue: 'tan', length: 4, actualValue: 'tan('},
  {type: KeyboardItemType.ADDITIONAL, shownValue: 'ᐯ', length: null, actualValue: null},
]


export const BASE_KEYS: Array<KeyboardItem> = [
  {type: KeyboardItemType.ERASE_ALL, shownValue: 'AC', length: null, actualValue: null},
  {type: KeyboardItemType.ARROW, shownValue: '←', length: null, actualValue: null},
  {type: KeyboardItemType.ARROW, shownValue: '→', length: null, actualValue: null},
  {type: KeyboardItemType.OPERATOR, shownValue: '^', length: 1, actualValue: '^'},
  {type: KeyboardItemType.PI, shownValue: 'π', length: 1, actualValue: 'π'},

  {type: KeyboardItemType.BRACKET, shownValue: '(', length: 1, actualValue: '('},
  {type: KeyboardItemType.BRACKET, shownValue: ')', length: 1, actualValue: ')'},
  {type: KeyboardItemType.OPERATOR, shownValue: '÷', length: 1, actualValue: '÷'},
  {type: KeyboardItemType.DIGIT, shownValue: 7, length: 1, actualValue: 7},
  {type: KeyboardItemType.DIGIT, shownValue: 8, length: 1, actualValue: 8},
  {type: KeyboardItemType.DIGIT, shownValue: 9, length: 1, actualValue: 9},
  {type: KeyboardItemType.OPERATOR, shownValue: '×', length: 1, actualValue: '×'},

  {type: KeyboardItemType.DIGIT, shownValue: 4, length: 1, actualValue: 4},
  {type: KeyboardItemType.DIGIT, shownValue: 5, length: 1, actualValue: 5},
  {type: KeyboardItemType.DIGIT, shownValue: 6, length: 1, actualValue: 6},
  {type: KeyboardItemType.OPERATOR, shownValue: '-', length: 1, actualValue: '-'},

  {type: KeyboardItemType.DIGIT, shownValue: 1, length: 1, actualValue: 1},
  {type: KeyboardItemType.DIGIT, shownValue: 2, length: 1, actualValue: 2},
  {type: KeyboardItemType.DIGIT, shownValue: 3, length: 1, actualValue: 3},
  {type: KeyboardItemType.OPERATOR, shownValue: '+', length: 1, actualValue: '+'},

  {type: KeyboardItemType.DIGIT, shownValue: 0, length: 1, actualValue: 0},
  {type: KeyboardItemType.DOT, shownValue: '.', length: 1, actualValue: '.'},
  {type: KeyboardItemType.ERASE, shownValue: '⌫', length: null, actualValue: null},
  {type: KeyboardItemType.EQUAL, shownValue: '=', length: null, actualValue: null}
]
