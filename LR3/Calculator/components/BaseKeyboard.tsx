import React from 'react'
import { KeyboardItem } from '../types/KeyboardItem'
import { KeyboardKey } from './KeyboardKey'


interface BaseKeyboardProps {
  keys: Array<KeyboardItem>
  onKeyPress: any
  orientationPortrait: boolean
}


export const BaseKeyboard = React.memo((props: BaseKeyboardProps): JSX.Element => (
  <>
    {
      props.keys.map((key: KeyboardItem, index: number): JSX.Element => (
        <KeyboardKey key={`${key.shownValue}${index}`}
                     onPress={props.onKeyPress}
                     keyItem={key}
                     usual={true}
                     orientationPortrait={props.orientationPortrait}
        />
      ))
    }
  </>
), (p, n): boolean => p.orientationPortrait === n.orientationPortrait)
