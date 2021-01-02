import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import Item from "./Item";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const Home = ({ navigation }) => {
  const [posts, setposts] = useState([]);

  const getPosts = () => {
    firebase
      .database()
      .ref("posts")
      .orderByChild("bookName")
      .on("value", (snapshot) => {
        setposts([]);
        snapshot.forEach((childSnapshot) => {
          let bookName = childSnapshot.val().bookName;
          let bookReview = childSnapshot.val().bookReview;
          let category = childSnapshot.val().category;
          let starCount = childSnapshot.val().starCount;
          let author = childSnapshot.val().author;
          let key = childSnapshot.key;
          let newPost = {
            author,
            bookName,
            bookReview,
            category,
            starCount,
            key,
          };
          setposts((posts) => [...posts, newPost]);
        });
      });
  };

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (token) {
      const res = await firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .update({
          token,
        });
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const ItemView = ({ item }) => {
    return <Item item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  itemcontainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#eaeaea",
    width: "85%",
    alignSelf: "center",
    borderRadius: 10,
  },
  itemname: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 16,
  },
  itemreview: {
    width: "100%",
    textAlign: "left",
    height: 75,
    overflow: "hidden",
    marginBottom: 5,
  },
});