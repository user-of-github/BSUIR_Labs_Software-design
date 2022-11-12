import React from 'react'
import { Input } from './Input'
import { Dimensions, EmitterSubscription, StyleSheet, View } from 'react-native'
import { Keyboard } from './Keyboard'
import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'
import { keyboardItemPressed } from '../utilities/computeKeyboardInput'
import { transformStringBeforeComputing } from '../utilities/transformStringBeforeComputing'
import { compute } from '../utilities/compute'
import { Output } from './Output'
import { isPortrait } from '../utilities/isOrientationPortrait'


export const Calculator = React.memo((): JSX.Element => {
  const [input, setInput] = React.useState<string>('')
  const [cursorPosition, setCursorPosition] = React.useState<number>(0)
  const [inputError, setInputError] = React.useState<boolean>(false)
  const [output, setOutput] = React.useState<string>('')

  const [showAdvancedKeys, setShowAdvancedKeys] = React.useState<boolean>(true)
  const showAdvancedKeysToggler = React.useCallback((): void => setShowAdvancedKeys(k => !k), [showAdvancedKeys, setShowAdvancedKeys])

  const cursorPositionRef: React.MutableRefObject<number> = React.useRef<number>(0)
  const valueRef: React.MutableRefObject<string> = React.useRef<string>('')

  const tokens: React.MutableRefObject<Array<KeyboardItem>> = React.useRef<Array<KeyboardItem>>([])
  const currentPositionInTokens: React.MutableRefObject<number> = React.useRef<number>(-1)

  const [isPortraitMode, setIsPortraitMode] = React.useState<boolean>(isPortrait())

  React.useEffect(() => {
    const onOrientationChange = (): void => {
      setIsPortraitMode(isPortrait() )
      if (!isPortrait()) setShowAdvancedKeys(i => true)
    }
    const subscription: EmitterSubscription = Dimensions.addEventListener('change', onOrientationChange)

    return (): void => subscription.remove()
  })

  const onKeyPress = React.useCallback((item: KeyboardItem): void => {
    if (item.type !== KeyboardItemType.EQUAL) {
      const response = keyboardItemPressed(
        valueRef.current,
        cursorPositionRef.current,
        item,
        tokens.current,
        currentPositionInTokens
      )

      valueRef.current = response[0]
      cursorPositionRef.current = response[1]
      setInput(i => valueRef.current)
      setCursorPosition(i => cursorPositionRef.current)

      //printTokens(tokens.current)
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


  React.useEffect((): void => {
    setOutput(i => '')
    setInputError(i => false)
  }, [input])


  return (
    <View style={styles.wrapper}>
      <Input value={input} cursorPosition={cursorPosition} isError={inputError} isPortrait={isPortraitMode} />
      <Output response={output} error={inputError} isPortrait={isPortraitMode}/>
      <Keyboard onKeyPress={onKeyPress}
                showAdvanced={showAdvancedKeys}
                showAdvancedToggler={showAdvancedKeysToggler}
                orientationPortrait={isPortraitMode}
      />
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
