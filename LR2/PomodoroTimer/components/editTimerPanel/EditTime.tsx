import { StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import React from 'react'
import { ACCENT_RED_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { Theme } from '../../types/Theme'


interface EditTimeProps {
  initialSeconds: number
  onChange: any
}

export const EditTime = React.memo((props: EditTimeProps): JSX.Element => {
  const [seconds, setSeconds] = React.useState<number>(props.initialSeconds % 60)
  const [minutes, setMinutes] = React.useState<number>(Math.floor(props.initialSeconds / 60))

  const { theme } = useSelector((state: RootState) => state.general)
  const labelStyles = [style.label, theme === Theme.DARK ? style.labelDark : style.labelLight]

  const incSeconds = React.useCallback((): void => {
    setSeconds(sec => sec < 59 ? sec + 1 : sec)
    Vibration.vibrate(20)
  }, [setSeconds])
  const decSeconds = React.useCallback((): void => {
    setSeconds(sec => sec > 0 ? sec - 1 : sec)
    Vibration.vibrate(20)
  }, [setSeconds])

  const incMinutes = React.useCallback((): void => {
    setMinutes(min => min < 30 ? min + 1 : min)
    Vibration.vibrate(20)
  }, [setMinutes])
  const decMinutes = React.useCallback((): void => {
    setMinutes(min => min > 0 ? min - 1 : min)
    Vibration.vibrate(20)
  }, [setMinutes])

  React.useEffect((): void => {
    props.onChange(minutes * 60 + seconds)
  }, [minutes, seconds])

  return (
    <View style={style.container}>
      <View style={style.inputGroup}>
        <TouchableOpacity onPress={decMinutes} style={style.change}>
          <Text style={style.changeText}>-</Text>
        </TouchableOpacity>
        <View style={style.labeledInput}>
          <Text style={labelStyles}>Minutes</Text>
          <TextInput style={style.input} editable={false} value={minutes.toString()} />
        </View>
        <TouchableOpacity onPress={incMinutes} style={style.change}>
          <Text style={style.changeText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={style.inputGroup}>
        <TouchableOpacity onPress={decSeconds} style={style.change}>
          <Text style={style.changeText}>-</Text>
        </TouchableOpacity>
        <View style={style.labeledInput}>
          <Text style={labelStyles}>Seconds</Text>
          <TextInput style={style.input} editable={false} value={seconds.toString()} />
        </View>
        <TouchableOpacity onPress={incSeconds} style={style.change}>
          <Text style={style.changeText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}, (): boolean => true)


const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '45%'
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },

  label: {
    fontSize: 15,
    fontWeight: '900'
  },

  labelLight: {
    color: 'grey'
  },

  labelDark: {
    color: 'rgba(255, 255, 255, 0.7)'
  },

  labeledInput: {
    display: 'flex',
    flexDirection: 'column',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    marginHorizontal: 2
  },

  input: {
    backgroundColor: 'white',
    padding: 0,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 28,
    borderRadius: 7
  },

  change: {
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
    paddingHorizontal: 11,
    backgroundColor: ACCENT_RED_COLOR,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  changeText: {
    fontWeight: '900',
    fontSize: 35,
    color: 'white'

  }
})
