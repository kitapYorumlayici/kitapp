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

const ListScreen = ({ route }) => {
  const [posts, setposts] = useState([]);
  const { item } = route.params;

  const getPosts = async () => {
    await firebase
      .database()
      .ref("posts")
      .on("value", (snapshot) => {
        setposts([]);
        snapshot.forEach((childSnapshot) => {
          if (item.value == childSnapshot.val().category) {
            let bookName = childSnapshot.val().bookName;
            let bookReview = childSnapshot.val().bookReview;
            let category = childSnapshot.val().category;
            let starCount = childSnapshot.val().starCount;
            let key = childSnapshot.val().key;
            let newPost = {
              bookName,
              bookReview,
              category,
              starCount,
              key,
            };
            setposts((posts) => [...posts, newPost]);
          }
        });
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            padding: 10,
            marginVertical: 10,
            backgroundColor: "#eaeaea",
            width: "85%",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              paddingVertical: 5,
              fontSize: 16,
            }}
          >
            {item.bookName}
          </Text>
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              height: 75,
              overflow: "hidden",
            }}
          >
            {item.bookReview}
          </Text>
          <Text style={{ width: "100%", textAlign: "left", fontSize: 10 }}>
            Kategori : {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
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

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
