import { StyleSheet } from "react-native";
import { ACCENT_RED_COLOR } from "../../styleConstants";


export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: ACCENT_RED_COLOR
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '100',
    color: ACCENT_RED_COLOR
  }
})
