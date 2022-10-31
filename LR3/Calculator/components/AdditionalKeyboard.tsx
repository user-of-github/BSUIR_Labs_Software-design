import React from 'react'
import { KeyboardItem } from '../types/KeyboardItem'
import { KeyboardKey } from './KeyboardKey'


interface AdditionalKeyboardProps {
  keys: Array<KeyboardItem>
  onKeyPress: any
}


export const AdditionalKeyboard = React.memo((props: AdditionalKeyboardProps): JSX.Element => (
  <>
    {
      props.keys.map((key: KeyboardItem, index: number): JSX.Element => (
        <KeyboardKey key={`${key.shownValue}${index}`}
                     onPress={props.onKeyPress}
                     keyItem={key}
                     usual={false}
        />
      ))
    }
  </>
), (): boolean => true)
