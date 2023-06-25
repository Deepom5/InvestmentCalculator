import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/routes/Navigation";
import { PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { Provider } from "react-redux";
import store from "./src/redux/Store";

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
}
