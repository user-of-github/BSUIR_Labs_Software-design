import React from 'react'
import { KeyboardItem } from '../types/KeyboardItem'
import { StyleSheet, View } from 'react-native'
import { BaseKeyboard } from './BaseKeyboard'
import { AdditionalKeyboard } from './AdditionalKeyboard'
import { ADDITIONAL_KEYS, BASE_KEYS } from '../utilities/keyConstants'


interface KeyboardProps {
  onKeyPress: (item: KeyboardItem) => void
}


export const Keyboard = React.memo((props: KeyboardProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <AdditionalKeyboard keys={ADDITIONAL_KEYS} onKeyPress={props.onKeyPress}/>
      <BaseKeyboard keys={BASE_KEYS} onKeyPress={props.onKeyPress}/>
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
    backgroundColor: '#FEFEFE',
    marginTop: 'auto'
  },
})
