import { Text, View } from "react-native";
import {styles} from './styles'


export const Header = (): JSX.Element => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Pomodoro Timer 🍅</Text>
      <Text style={styles.subtitle}>by @user-of-github</Text>
    </View>
  </View>
)
