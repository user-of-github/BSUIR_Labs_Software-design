import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { showMessage } from 'react-native-flash-message'


interface EditCounterProps {
  initial: number
  maxAccepted: number
  onChange: (newValue: number) => void
}

export const EditCounter = React.memo((props: EditCounterProps): JSX.Element => {
  const [counter, setCounter] = React.useState<number>(props.initial)

  const decCounter = React.useCallback((): void => {
    Vibration.vibrate(30)
    setCounter(c => c > 1 ? c - 1 : c)
  }, [setCounter])

  const incCounter = React.useCallback((): void => {
    Vibration.vibrate(30)
    setCounter((c: number): number => {
      if (c < props.maxAccepted) return c + 1

      showMessage({ position: 'bottom', message: `Maximum cycles count is ${props.maxAccepted}`, description: '' })
      return c
    })
  }, [setCounter, props.maxAccepted])

  const resetCounter = React.useCallback((): void => {
    Vibration.vibrate(40)
    setCounter(c => 1)
  }, [setCounter])

  React.useEffect((): void => {
    props.onChange(counter)
  }, [counter])


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decCounter} style={styles.change} onLongPress={resetCounter}>
        <Text style={styles.changeText}>-</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} editable={false} value={counter.toString()} />

      <TouchableOpacity onPress={incCounter} style={styles.change}>
        <Text style={styles.changeText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}, (): boolean => true)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5
  },
  input: {
    backgroundColor: 'white',
    padding: 0,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 28,
    borderRadius: 7,
    marginHorizontal: 7,
    paddingHorizontal: 10
  },

  change: {
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: 40,
    height: 40,
    backgroundColor: ACCENT_RED_COLOR,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 0,
    textAlignVertical: 'center'
  },

  changeText: {
    fontWeight: '900',
    fontSize: 30,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    textAlignVertical: 'center',
  }
})
