import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import {
  ERRORED_TEXT_LIGHT_COLOR,
  INPUT_OUTPUT_DEFAULT_TEXT_LIGHT,
  INPUT_OUTPUT_LIGHT_BACKGROUND,
} from '../utilities/styleConstants'


interface CalculatorInputProps {
  value: string
  cursorPosition: number
  isError: boolean
}

const arePropsEqual = (prev: CalculatorInputProps, next: CalculatorInputProps): boolean =>
  prev.value === next.value
  && prev.cursorPosition === next.cursorPosition
  && prev.isError === next.isError


export const Input = React.memo((props: CalculatorInputProps): JSX.Element => (
  <View style={styles.wrapper}>
    <TextInput style={[styles.input, props.isError && styles.errored]}
               textAlign={'right'}
               autoFocus={true}
               value={props.value}
               showSoftInputOnFocus={false}
               selection={{ start: props.cursorPosition, end: props.cursorPosition }} keyboardType={undefined}
    />
    <View style={styles.protect} />
  </View>
), arePropsEqual)

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  input: {
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
    paddingTop: 65,
    paddingBottom: 50,
    backgroundColor: INPUT_OUTPUT_LIGHT_BACKGROUND,
    fontSize: 60,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: INPUT_OUTPUT_DEFAULT_TEXT_LIGHT,
    letterSpacing: 3
  },


  errored: {
    color: ERRORED_TEXT_LIGHT_COLOR,
  },

  protect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },

})
