import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { TimersList } from "../../components/timersList/TimersList";



export const HomeScreen =(): JSX.Element => (
  <View style={styles.container}>
    <Header/>
    <TimersList/>
    <Footer/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid'
  }
})
