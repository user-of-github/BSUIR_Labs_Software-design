import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Application } from "./components/Application";

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <Application />
      </Provider>
    </SafeAreaView>
  );
};


export default App;
