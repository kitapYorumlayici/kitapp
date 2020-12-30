import * as React from "react";
import { Button, Text, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";
import Post from "../components/Post";
import Profile from "../components/Profile";
import Categories from "../components/Categories";
import ListScreen from "../components/ListScreen";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const CategoriesStack = createStackNavigator();

function CategoriesStackScreen() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen name="Categories" component={Categories} />
      <CategoriesStack.Screen
        name="List Screen"
        component={ListScreen}
        options={({ route }) => ({ title: route.params.item.title })}
      />
    </CategoriesStack.Navigator>
  );
}

const ProfileScreen = () => {
  return <Profile />;
};

const PostStack = createStackNavigator();

function PostStackScreen() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Post" component={Post} />
    </PostStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Mainpage() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "md-home" : "md-home-outline";
            } else if (route.name === "Categories") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Post") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} color={color} size={25} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Categories" component={CategoriesStackScreen} />
        <Tab.Screen name="Post" component={PostStackScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
