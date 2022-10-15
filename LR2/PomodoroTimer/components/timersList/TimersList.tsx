import { storage, TIMERS_IDS_LIST_KEY, TIMERS_LIST_KEY } from '../../state/storage'
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { Timer } from '../../types/Timer'
import React from 'react'
import { ACCENT_RED_COLOR, ITEMS_BG_COLOR } from '../../utils/styleConstants'
import { useSelector } from 'react-redux'
import { Theme } from '../../types/Theme'
import { FlashList } from '@shopify/flash-list'
import { TimersListItem } from './TimersListItem'
import { MAX_TIMERS_ALLOWED_ADVANCED_MODE, MAX_TIMERS_ALLOWED_STANDARD_MODE } from '../../utils/appConstants'
import { showMessage } from 'react-native-flash-message'
import { configureNewTimer } from '../../utils/configureNewTimer'
import { removeAllTimers } from '../../utils/removeAllTimers'


export const TimersList = (): JSX.Element => {
  //removeAllTimers(storage)
  // @ts-ignore
  const { theme } = useSelector(state => state.theme)
  const { advancedModeEnabled } = useSelector(state => state.mode)

  const [list, setList] = React.useState<Array<Timer>>(JSON.parse(
    storage.getString(TIMERS_IDS_LIST_KEY) || '[]')
    .map((id: string): Timer => JSON.parse(storage.getString(id)!))
  )

  const noItemStyles = [styles.noItems, theme === Theme.DARK ? styles.noItemsDark : styles.noItemsLight]
  const titleStyles = [styles.title, theme === Theme.DARK ? styles.titleDark : styles.titleLight]
  const containerStyles = [styles.container, theme === Theme.DARK ? styles.containerDark : styles.containerLight]

  const addNewItemButtonClickHandler = (): void => {
    Vibration.vibrate(20)
    if (!advancedModeEnabled) { // standard mode
      if (list.length + 1 > MAX_TIMERS_ALLOWED_STANDARD_MODE) {
        showMessage({
          message: `Standard mode allows to create not more than ${MAX_TIMERS_ALLOWED_STANDARD_MODE} timers`,
          description: '',
          type: 'danger'
        })
      } else {
        setList([...list, configureNewTimer(storage)])
      }
    } else {
      if (list.length + 1 > MAX_TIMERS_ALLOWED_ADVANCED_MODE) {
        showMessage({
          message: `Even in advanced mode you aren't allowed to create more than ${MAX_TIMERS_ALLOWED_ADVANCED_MODE} timers`,
          description: '',
          type: 'danger'
        })
      } else {
        setList([...list, configureNewTimer(storage)])
      }
    }
  }

  const updateFromStorage = (): void => {
    const ids: Array<string> = JSON.parse(storage.getString(TIMERS_IDS_LIST_KEY) || '[]')
    const data: Array<Timer> = ids.map((id: string): Timer => JSON.parse(storage.getString(id)!))
    setList(data)
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
            <FlashList renderItem={({ item }) => <TimersListItem timer={item}
                                                                 updateParentIfRemoved={updateFromStorage}
            />}
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
    fontSize: 35,
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
