import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../components/Login";
import Register from "../components/Register";
import Sidebar from "../components/Sidebar";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerType="back"
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen
        options={{ drawerLabel: "Giriş Yap" }}
        name="Giriş Yap"
        component={Login}
      />
      <Drawer.Screen name="Kayıt Ol" component={Register} />
    </Drawer.Navigator>
  );
}

export default function Homepage() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
