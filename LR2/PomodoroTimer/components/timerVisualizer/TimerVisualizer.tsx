import React from 'react'
import { StageName } from '../../types/StageName'
import { StyleSheet, Text } from 'react-native'
import { ACCENT_RED_COLOR } from '../../utils/styleConstants'


interface TimerVisualizerProps {
  secondsPassed: number
  stageName: StageName
}

const areEqual = (prev: TimerVisualizerProps, next: TimerVisualizerProps): boolean => prev.stageName === next.stageName && prev.secondsPassed === next.secondsPassed


export const TimerVisualizer = React.memo((props: TimerVisualizerProps): JSX.Element => (
  <>
    <Text style={styles.timePassed}>{props.secondsPassed}</Text>
    <Text style={styles.stageName}>{props.stageName}</Text>
  </>
), areEqual)


const styles = StyleSheet.create({
  timePassed: {
    fontSize: 80,
    fontWeight: '900',
    color: ACCENT_RED_COLOR,
    marginTop: -150
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
