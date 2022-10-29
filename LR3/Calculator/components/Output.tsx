import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ERRORED_TEXT_LIGHT_COLOR,
  INPUT_OUTPUT_DEFAULT_TEXT_LIGHT,
  INPUT_OUTPUT_LIGHT_BACKGROUND,
} from '../utilities/constants'

interface OutputProps {
  response: string
  error: boolean
}

const areEqual = (prev: OutputProps, next: OutputProps): boolean => prev.error === next.error && prev.response ===
  next.response


export const Output = React.memo((props: OutputProps): JSX.Element => (
  <View style={styles.container}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {
        props.error
          ?
          <Text style={styles.errorText} numberOfLines={1}>Format Error</Text>
          :
          <Text style={styles.response} numberOfLines={1}>{props.response}</Text>
      }
    </ScrollView>
  </View>
), areEqual)


const styles = StyleSheet.create({
  container: {
    backgroundColor: INPUT_OUTPUT_LIGHT_BACKGROUND,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: 'auto',
  },

  errorText: {
    fontSize: 50,
    fontWeight: '900',
    color: ERRORED_TEXT_LIGHT_COLOR,
    textAlign: 'right',
  },

  response: {
    fontSize: 50,
    fontWeight: '900',
    color: INPUT_OUTPUT_DEFAULT_TEXT_LIGHT,
    textAlign: 'right',
  },
})
