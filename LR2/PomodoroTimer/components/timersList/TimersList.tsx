import { storage, TIMERS_LIST_KEY } from '../../state/storage'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Timer } from '../../types/Timer'
import React from 'react'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { getNewTimer } from '../../utils/getNewTimer'
import { FlashList } from '@shopify/flash-list'
import { TimersListItem } from './TimersListItem'
import { MAX_TIMERS_ALLOWED_ADVANCED_MODE, MAX_TIMERS_ALLOWED_STANDARD_MODE } from '../../utils/appConstants'


export const TimersList = (): JSX.Element => {

  // @ts-ignore
  const { theme } = useSelector(state => {
    console.log(state)
    return state.theme
  })
  const { advancedModeEnabled } = useSelector(state => {
    console.log(state)
    return state.mode
  })
  const sourceData: string | undefined = storage.getString(TIMERS_LIST_KEY)
  const [list, setList] = React.useState<Array<Timer>>(sourceData !== undefined ? JSON.parse(sourceData) : [])

  const noItemStyles = [styles.noItems, theme === Theme.DARK ? styles.noItemsDark : styles.noItemsLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]

  const addNewItemButtonClickHandler = (): void => {
    console.log(advancedModeEnabled)
    if (advancedModeEnabled === false) { // standard mode
      if (list.length + 1 > MAX_TIMERS_ALLOWED_STANDARD_MODE) {
        ToastAndroid.show(
          `Standard mode allows to create not more than ${MAX_TIMERS_ALLOWED_STANDARD_MODE} timers`,
          ToastAndroid.SHORT
        )
      } else {
        setList([...list, getNewTimer()])
      }
    } else if (advancedModeEnabled === true) {
      if (list.length + 1 > MAX_TIMERS_ALLOWED_ADVANCED_MODE) {
        ToastAndroid.show(
          `Even in advanced mode you aren't allowed to create more than ${MAX_TIMERS_ALLOWED_ADVANCED_MODE} timers`,
          ToastAndroid.SHORT
        )
      } else {
        setList([...list, getNewTimer()])
      }
    }
  }

  React.useEffect(() => storage.set(TIMERS_LIST_KEY, JSON.stringify(list)), [list])

  return (
    <View style={styles.wrapper}>
      <View style={containerStyles}>
        <Text style={titleStyles}>Timers List:</Text>
        {
          list.length === 0
            ?
            <Text style={noItemStyles}>Create new pomodoro ...</Text>
            :
            <FlashList renderItem={({ item }) => <TimersListItem timer={item} />}
                       data={list}
                       estimatedItemSize={list.length > 0 ? list.length : 1}
                       keyExtractor={(item, index) => `${item.id}${index}`}

            />

        }
        <TouchableOpacity style={styles.addNewItem} onPress={() => addNewItemButtonClickHandler()}>
          <Text style={styles.addNewItemText}>New Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingTop: 20,
    height: '100%'
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    paddingTop: 40,
    minHeight: '70%',
    borderRadius: 10,
    paddingVertical: 30
  },
  containerLight: {
    backgroundColor: ITEMS_BG_COLOR
  },
  containerDark: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 30
  },
  titleLight: {
    color: 'rgba(0,0,0,.5)'
  },
  titleDark: {
    color: 'rgba(255,255,255,0.7)'
  },
  noItems: {
    marginRight: 'auto',
    fontWeight: '300',
    fontSize: 30

  },
  noItemsLight: {
    color: 'rgba(0, 0, 0, 0.35)'
  },
  noItemsDark: {
    color: 'rgba(255, 255, 255, 0.35)'
  },
  addNewItem: {
    paddingVertical: 15,
    backgroundColor: ACCENT_RED_COLOR,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 'auto'
  },

  addNewItemText: {
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '900',
    textAlign: 'center'
  }
})
