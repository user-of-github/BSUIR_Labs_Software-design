import React from 'react'
import { KeyboardItem } from '../types/KeyboardItem'
import { StyleSheet, View } from 'react-native'
import { BaseKeyboard } from './BaseKeyboard'
import { AdditionalKeyboard } from './AdditionalKeyboard'
import { ADDITIONAL_KEYS, BASE_KEYS } from '../utilities/keyConstants'
import { ShowAdditionalKeysKey } from './ShowAdditionalKeysKey'


interface KeyboardProps {
  onKeyPress: (item: KeyboardItem) => void
  showAdvanced: boolean
  showAdvancedToggler: () => void
  orientationPortrait: boolean
}

const areEqual = (prevProps: Readonly<KeyboardProps>, nextProps: Readonly<KeyboardProps>): boolean =>
  prevProps.orientationPortrait === nextProps.orientationPortrait && prevProps.showAdvanced === nextProps.showAdvanced


export const Keyboard = React.memo((props: KeyboardProps): JSX.Element => {

  return (
    <View style={styles.wrapper}>
      <ShowAdditionalKeysKey onClick={props.showAdvancedToggler} isShown={props.showAdvanced} isPortrait={props.orientationPortrait}/>
      {props.showAdvanced &&  <AdditionalKeyboard keys={ADDITIONAL_KEYS} onKeyPress={props.onKeyPress} orientationPortrait={props.orientationPortrait}/>}
      <BaseKeyboard keys={BASE_KEYS} onKeyPress={props.onKeyPress} orientationPortrait={props.orientationPortrait}/>
    </View>
  )
}, areEqual)


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    paddingBottom: 10,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: '#FEFEFE',
    marginTop: 'auto',
    position: 'relative',
  },
})
