import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Animated, Easing } from 'react-native'


interface TimerAnimationProps {
  color: string
}


export const TimerAnimation = React.memo((props: TimerAnimationProps): JSX.Element => {
  const spinValue: Animated.Value = new Animated.Value(0)

// First set up animation
  Animated.loop(Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  )).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
  const spin: Animated.AnimatedInterpolation<string | number> = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Svg width={213} height={213} fill="none">
        <Path
          d="M213 106.5A106.503 106.503 0 0 0 106.5 0v13.656a92.846 92.846 0 0 1 92.844 92.844H213Z"
          fill={props.color}
        />
        <Path
          d="M0 106.5A106.5 106.5 0 0 0 106.5 213v-13.656A92.841 92.841 0 0 1 13.656 106.5H0Z"
          fill={props.color}
        />
      </Svg>
    </Animated.View>
  )
}, (): boolean => true)
