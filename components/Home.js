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
    getPosts();
  }, []);

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
