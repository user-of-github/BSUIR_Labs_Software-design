import React from 'react'
import { StageName } from '../../types/StageName'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { ACCENT_RED_COLOR } from '../../utils/styleConstants'
import { getPrettifiedTime } from '../../utils/getPrettifiedTime'


interface TimerVisualizerProps {
  secondsPassed: number
  stageName: StageName
}

const areEqual = (prev: TimerVisualizerProps, next: TimerVisualizerProps): boolean => prev.stageName === next.stageName && prev.secondsPassed === next.secondsPassed


export const TimerVisualizer = React.memo((props: TimerVisualizerProps): JSX.Element => {
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
    inputRange: [0.7, 1],
    outputRange: [0.7, 1]
  })

  const prettified: [number, number] = getPrettifiedTime(props.secondsPassed)

  const seconds: number = props.secondsPassed >= 0 ? prettified[1] : 0
  const minutes: number = props.secondsPassed >= 0 ? prettified[0] : 0

  return (
    <>
      <View style={styles.container}>
        {
          minutes !== 0
          &&
            <>
              <Text style={[styles.timePassed]}>
                {
                  minutes < 10
                  ?
                    '0' + minutes.toString()
                    :
                    minutes
                }
              </Text>
              <Text style={styles.timePassed}>:</Text>
            </>
        }
        <Animated.Text style={[styles.timePassed, { transform: [{ scale: spin }], opacity: spin }]}>
          {
            minutes !== 0
            ?
            seconds < 10 ? '0' + seconds : seconds
              :
              seconds
          }
        </Animated.Text>
      </View>
      <Text style={styles.stageName}>{props.stageName}</Text>
    </>
  )
}, areEqual)


const styles = StyleSheet.create({
  container: {
    marginTop: -150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  timePassed: {
    fontSize: 70,
    fontWeight: '900',
    color: ACCENT_RED_COLOR,
  },

  stageName: {
    fontSize: 30,
    fontWeight: '100',
    //color: 'white',
    marginTop: 90,
    padding: 5,
    backgroundColor: ACCENT_RED_COLOR,
    color: 'white',
    width: '90%',
    borderRadius: 100,
    textAlign: 'center',
    textTransform: 'capitalize'
  }
})
