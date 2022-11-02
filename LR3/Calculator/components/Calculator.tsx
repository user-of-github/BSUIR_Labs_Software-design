import React from 'react'
import { Input } from './Input'
import { StyleSheet, View } from 'react-native'
import { Keyboard } from './Keyboard'
import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'
import { computeKeyboardInput } from '../utilities/computeKeyboardInput'
import { transformStringBeforeComputing } from '../utilities/transformStringBeforeComputing'
import { compute } from '../utilities/compute'
import { Output } from './Output'



export const Calculator = React.memo((): JSX.Element => {
  const [input, setInput] = React.useState<string>('')
  const [cursorPosition, setCursorPosition] = React.useState<number>(0)
  const [inputError, setInputError] = React.useState<boolean>(false)
  const [output, setOutput] = React.useState<string>('')

  const cursorPositionRef: React.MutableRefObject<number> = React.useRef<number>(0)
  const valueRef: React.MutableRefObject<string> = React.useRef<string>('')

  const onKeyPress = React.useCallback((item: KeyboardItem): void => {
    if (item.type !== KeyboardItemType.EQUAL) {
      setInputError(false)
      const response = computeKeyboardInput(valueRef.current, cursorPositionRef.current, item)
      //console.log(response)
      valueRef.current = response[0]
      cursorPositionRef.current = response[1]
      setInput(i => valueRef.current)
      setCursorPosition(i => cursorPositionRef.current)
    } else {
      try {
        const transformed: string = transformStringBeforeComputing(valueRef.current)
        const tryParse = compute(transformed)

        if (tryParse === 'Infinity') {
          setInputError(true)
          setOutput('Value too large')
        } else {
          setOutput(tryParse)
        }

      } catch (e) {
        console.log('Error in Calculator.onKeyPress: ', e)
        setInputError(true)
        setOutput('Format error')
      }
    }
  }, [input, setInput, cursorPosition, setCursorPosition, setInputError, setOutput])


  React.useEffect((): void => setOutput(''), [input])


  return (
    <View style={styles.wrapper}>
      <Input value={input} cursorPosition={cursorPosition} isError={inputError} />
      <Output response={output} error={inputError}/>
      <Keyboard onKeyPress={onKeyPress}/>
    </View>
  )
}, (): boolean => true)


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FEFEFE'
  }
})
