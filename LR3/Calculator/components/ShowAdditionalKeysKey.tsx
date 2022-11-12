import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'


interface ShowAdditionalKeysKeyProps {
  onClick: () => void
  isShown: boolean
  isPortrait: boolean
}

export const ShowAdditionalKeysKey = React.memo((props: ShowAdditionalKeysKeyProps): JSX.Element => (
  <TouchableOpacity style={[style.key, !props.isPortrait && style.landscape]} onPress={props.onClick} activeOpacity={0.1}>
    <Text style={style.keyText}>{props.isShown ? '▼' : '▲'}</Text>
  </TouchableOpacity>
), (prev, next): boolean => prev.isShown === next.isShown && prev.isPortrait === next.isPortrait)

const style = StyleSheet.create({
  key: {
    position: 'absolute',
    top: -45,
    right: 10,
    height: 45,
    width: 45,
    borderRadius: 100,
    backgroundColor: 'black',
    display: 'flex',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  landscape: {
    width: 25,
    height: 25,
    top: -25
  },

  keyText: {
    fontWeight: '900',
    color: 'white',
    fontSize: 22,
  },
})
