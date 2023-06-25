import React, { lazy } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
// const Home = lazy(() => import("../screens/Home"));
import { useAppSelector } from "../redux/Store";
// import SliderApp from "../App";

const Stack = createStackNavigator();

function Navigation() {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home_screen"
    >
      <Stack.Screen
        options={{
          tabBarLabel: "Home",
        }}
        name="Home_screen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
