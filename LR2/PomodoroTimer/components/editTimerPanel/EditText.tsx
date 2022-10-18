import React from 'react'
import { StyleProp, TextInput, TextStyle } from 'react-native'


interface EditTextProps {
  initial: string
  onTextChange: (newText: string) => void
  styles?: StyleProp<TextStyle> | undefined
  maxLength: number
}

export const EditText = React.memo((props: EditTextProps): JSX.Element => {
  const [text, setText] = React.useState<string>(props.initial)

  const onTextChange = (newText: string) => {
    if (newText.length <= props.maxLength) {
      setText(text => newText)
      props.onTextChange(newText)
    }
  }

  return (
    <TextInput style={props.styles}
               onChangeText={(newText: string): void => onTextChange(newText)}
               value={text}
               maxLength={props.maxLength}
    />
  )

}, (): boolean => true)
