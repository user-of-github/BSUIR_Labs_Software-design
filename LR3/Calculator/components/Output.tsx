import React from 'react'
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ERRORED_TEXT_LIGHT_COLOR,
  INPUT_OUTPUT_DEFAULT_TEXT_LIGHT,
  INPUT_OUTPUT_LIGHT_BACKGROUND,
} from '../utilities/styleConstants'

interface OutputProps {
  response: string
  error: boolean
}

const areEqual = (prev: OutputProps, next: OutputProps): boolean =>
  prev.error === next.error && prev.response === next.response


export const Output = React.memo((props: OutputProps): JSX.Element => {
  const spinValue: Animated.Value = new Animated.Value(0)

  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 300,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  ).start()


  const spin: Animated.AnimatedInterpolation<string | number> = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Animated.Text style={[props.error ? styles.errorText : styles.response,  {opacity: spin}]} numberOfLines={1}>{props.response}</Animated.Text>
      </ScrollView>
    </View>
  )
}, areEqual)


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
