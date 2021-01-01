import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import Item from "./Item";

const Profile = ({ navigation }) => {
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState({});

  const getPosts = () => {
    firebase
      .database()
      .ref("posts")
      .orderByChild("bookName")
      .on("value", (snapshot) => {
        setposts([]);
        snapshot.forEach((childSnapshot) => {
          if (firebase.auth().currentUser.uid == childSnapshot.val().author) {
            let bookName = childSnapshot.val().bookName;
            let bookReview = childSnapshot.val().bookReview;
            let category = childSnapshot.val().category;
            let starCount = childSnapshot.val().starCount;
            let key = childSnapshot.key;
            let author = childSnapshot.val().author;
            let newPost = {
              bookName,
              bookReview,
              category,
              starCount,
              key,
              author,
            };
            setposts((posts) => [...posts, newPost]);
          }
        });
      });
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .once("value", (snapshot) => {
        setuser([]);
        let user = {
          email: snapshot.val().email,
          name: snapshot.val().name,
          surname: snapshot.val().surname,
        };
        setuser(user);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const ItemView = ({ item }) => {
    return <Item item={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.userinfo}>
        <View style={{ width: "80%", alignSelf: "flex-start" }}>
          <Text style={styles.text}>
            {user.name} {user.surname}
          </Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.text}>
            Ship olunan kitap yorumu sayısı : {posts.length}
          </Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Button
            title="Logout"
            onPress={() => {
              Alert.alert("Logout", "Do you want to log out ?", [
                {
                  text: "yes",
                  onPress: () => {
                    firebase.auth().signOut();
                  },
                },
                {
                  text: "no",
                },
              ]);
            }}
          />
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={ItemView}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    width: "100%",
    textAlign: "left",
    padding: 3,
  },
  userinfo: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    padding: 20,
    borderBottomColor: "#393e46",
    borderBottomWidth: 1,
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
