import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { KeyboardItem, KeyboardItemType } from '../types/KeyboardItem'


interface KeyboardKeyProps {
  keyItem: KeyboardItem
  onPress: (item: KeyboardItem) => void
  usual: boolean
  orientationPortrait: boolean
}

export const KeyboardKey = React.memo((props: KeyboardKeyProps): JSX.Element => {
  const style = [
    styles.key,
    props.usual === false
      ? styles.keyAdditional : styles.keyBase,
    props.orientationPortrait === false && styles.landscapeKey]

  const textStyle = [
    props.usual === true ? styles.keyText : styles.keyTextAdditional,
    props.orientationPortrait === false && styles.landscapeText
  ]

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
        <Text style={textStyle}>
          {props.keyItem.shownValue}
        </Text>
      </TouchableOpacity>
    </View>
  )
}, (p, n): boolean => p.orientationPortrait === n.orientationPortrait)

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
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
    height: 52,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  keyBase: {
    backgroundColor: 'blue'
  },

  landscapeKey: {
    height: 25
  },

  landscapeText: {
    fontWeight: '900',
    fontSize: 17,
  },

  keyAdditional: {
    backgroundColor: 'transparent',
    height: 35
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
    fontSize: 29,
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
    fontSize: 25,
    color: 'black',
  }
})
