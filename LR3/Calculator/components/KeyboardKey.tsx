import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'


interface KeyboardKeyProps {
  keyItem: KeyboardItem
  onPress: (item: KeyboardItem) => void
  usual: boolean
}

export const KeyboardKey = React.memo((props: KeyboardKeyProps): JSX.Element => {
  const style = [styles.key, props.usual === false ? styles.keyAdditional : styles.keyBase]

  if (props.usual) style.push(props.keyItem.type === KeyboardItemType.ERASE_ALL
    ? styles.control :
    props.keyItem.type === KeyboardItemType.DIGIT
      ? styles.digit
      : props.keyItem.type === KeyboardItemType.ARROW
        ? styles.arrow
        : styles.notdigit)


  const pressHandler = React.useCallback((): void => {
    Vibration.vibrate(30)
    props.onPress(props.keyItem)
  }, [])

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={style} onPress={pressHandler} activeOpacity={0.1}>
        <Text style={props.usual === true ? styles.keyText : styles.keyTextAdditional}>
          {props.keyItem.shownValue}
        </Text>
      </TouchableOpacity>
    </View>
  )
}, (): boolean => false)

const styles = StyleSheet.create({
  wrapper: {
    height: 65,
    padding: 3,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    borderRadius: 40,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  keyBase: {
    backgroundColor: 'blue'
  },

  keyAdditional: {
    backgroundColor: 'transparent'
  },

  digit: {
    backgroundColor: '#F7F8FC',
  },

  notdigit: {
    backgroundColor: '#C2E6FE',
  },

  control: {
    backgroundColor: '#C2EDCF',
  },

  arrow: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#C2EDCF',
  },

  keyText: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 33,
    color: 'black',
  },

  keyTextAdditional: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 22,
    color: 'black',
  }
})
