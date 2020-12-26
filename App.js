import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Homepage from "./pages/Homepage";
import Mainpage from "./pages/Mainpage";
import * as firebase from "firebase";
import Keys from "./config/keys";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAuthReady: false,
      isLoaded: true,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(Keys.firebaseConfig);
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({ isAuthReady: true });
        this.setState({ isLoggedIn: !!user });
      });
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        {this.state.isLoggedIn == true ? <Mainpage /> : <Homepage />}
      </View>
    );
  }
}
