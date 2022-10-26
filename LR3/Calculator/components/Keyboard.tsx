import React from 'react'
import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'
import { StyleSheet, View } from 'react-native'
import { KeyboardKey } from './KeyboardKey'


const BASE_KEYS: Array<KeyboardItem> = [
  {type: KeyboardItemType.ERASE_ALL, value: 'AC'},
  {type: KeyboardItemType.ARROW, value: '←'},
  {type: KeyboardItemType.ARROW, value: '→'},
  {type: KeyboardItemType.OPERATOR, value: '^'},
  {type: KeyboardItemType.PI, value: 'π'},

  {type: KeyboardItemType.BRACKET, value: '('},
  {type: KeyboardItemType.BRACKET, value: ')'},
  {type: KeyboardItemType.OPERATOR, value: '÷'},
  {type: KeyboardItemType.DIGIT, value: 7},
  {type: KeyboardItemType.DIGIT, value: 8},
  {type: KeyboardItemType.DIGIT, value: 9},
  {type: KeyboardItemType.OPERATOR, value: '×'},

  {type: KeyboardItemType.DIGIT, value: 4},
  {type: KeyboardItemType.DIGIT, value: 5},
  {type: KeyboardItemType.DIGIT, value: 6},
  {type: KeyboardItemType.OPERATOR, value: '-'},

  {type: KeyboardItemType.DIGIT, value: 1},
  {type: KeyboardItemType.DIGIT, value: 2},
  {type: KeyboardItemType.DIGIT, value: 3},
  {type: KeyboardItemType.OPERATOR, value: '+'},

  {type: KeyboardItemType.DIGIT, value: 0},
  {type: KeyboardItemType.DOT, value: '.'},
  {type: KeyboardItemType.ERASE, value: '⌫'},
  {type: KeyboardItemType.EQUAL, value: '='}
]

interface KeyboardProps {
  onKeyPress: (item: KeyboardItem) => void
}


export const Keyboard = React.memo((props: KeyboardProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      {
        BASE_KEYS.map((key: KeyboardItem): JSX.Element => (
          <KeyboardKey key={key.value} onPress={props.onKeyPress} keyItem={key} />
        ))
      }
    </View>
  )
}, (): boolean => true)

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    paddingBottom: 10,
    backgroundColor: '#FEFEFE'
  },
})
