import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


interface CalculatorInputProps {
  value: string
  cursorPosition: number
  isError: boolean
  output: string
}

const arePropsEqual = (prev: CalculatorInputProps, next: CalculatorInputProps): boolean =>
  prev.value === next.value
  && prev.cursorPosition === next.cursorPosition
  && prev.isError === next.isError
  && prev.output === next.output


export const CalculatorInput = React.memo((props: CalculatorInputProps): JSX.Element => (
    <View style={styles.wrapper}>
      <TextInput style={[styles.input, props.isError === true && styles.errored]}
                 textAlign={'right'}
                 autoFocus={true}
                 value={props.value}
                 showSoftInputOnFocus={false}
                 selection={{start: props.cursorPosition, end: props.cursorPosition}}
      />
      <View style={styles.protect}>
        {
          props.isError
            ? <Text style={styles.errorText}>Format Error</Text>
            : <Text style={styles.response}>{props.output}</Text>
        }
      </View>
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
    paddingTop: 100,
    paddingBottom: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#EAEEF9',
    fontSize: 60,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: 'default'
  },

  errored: {
    color: '#e74c3c'
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
    paddingHorizontal: 30
  },
  errorText: {
    fontSize: 50,
    fontWeight: '900',
    color: '#e74c3c'
  },

  response: {
    fontSize: 30,
    fontWeight: '900',
    color: '#16a085'
  }
})
