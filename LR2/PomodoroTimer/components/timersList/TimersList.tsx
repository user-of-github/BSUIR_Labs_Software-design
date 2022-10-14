import { storage, TIMERS_LIST_KEY } from "../../state/storage";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Timer } from "../../types/Timer";
import React from "react";
import { ACCENT_RED_COLOR } from "../../utils/styleConstants";
import { useSelector } from "react-redux";
import { Theme } from "../../types/Theme";


export const TimersList = (): JSX.Element => {
  // @ts-ignore
  const { theme } = useSelector(state => state.theme);
  const sourceData: string | undefined = storage.getString(TIMERS_LIST_KEY);
  const [list, setList] = React.useState<Array<Timer>>(sourceData !== undefined ? JSON.parse(sourceData) : []);

  const noItemStyles = [styles.noItems, theme === Theme.DARK ? styles.noItemsDark : styles.noItemsLight];

  const addNewItemButtonClickHandler = (): void => {
    setList([...list, {prepareSeconds: 0, restSeconds: 0, secondsPassed: 0, workSeconds: 0, totalSecondsCount: 0, cyclesCount: 0, title: 'New pomodoro'}])
  }

  React.useEffect(() => {
    storage.set(TIMERS_LIST_KEY, JSON.stringify(list))
  }, [list])

  return (
    <View style={styles.container}>
      {
        list === undefined
          ?
          <Text style={noItemStyles}>Create new pomodoro ...</Text>
          :
            <View>
              {
                list.map((item: Timer, index: number) => <View key={index}><Text>{item.title}</Text></View>)
              }
            </View>
      }
      <TouchableHighlight style={styles.addNewItem} onPress={() => addNewItemButtonClickHandler()}>
        <Text style={styles.addNewItemText}>New Timer</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
    borderStyle: "solid",
    paddingTop: 40,
    minHeight: "50%",
  },
  noItems: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "900",
    fontSize: 30,
  },
  noItemsLight: {
    color: "rgba(0, 0, 0, 0.35)",
  },
  noItemsDark: {
    color: "rgba(255, 255, 255, 0.35)",
  },
  addNewItem: {
    paddingVertical: 15,
    backgroundColor: ACCENT_RED_COLOR,
    textAlign: "center",
    borderRadius: 10,
    marginTop: "auto",
  },

  addNewItemText: {
    fontSize: 20,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "900",
    textAlign: "center",
  },
});
