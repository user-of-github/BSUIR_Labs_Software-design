import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Footer } from "../../components/footer/Footer";
import { Theme } from "../../types/Theme";
import { Header } from "../../components/header/Header";



export const HomeScreen =(): JSX.Element => (
  <View style={styles.container}>
    <Header/>
    <Footer/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent'
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid'
  }
})
