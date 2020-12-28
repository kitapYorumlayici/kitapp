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

const Profile = () => {
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState({});

  const getPosts = async () => {
    await firebase
      .database()
      .ref("posts")
      .on("value", (snapshot) => {
        setposts([]);
        snapshot.forEach((childSnapshot) => {
          if (firebase.auth().currentUser.uid == childSnapshot.val().author) {
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
  const getUser = async () => {
    await firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
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
    getUser();
    getPosts();
  }, []);
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
        renderItem={(item) => (
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
                {item.item.bookName}
              </Text>
              <Text
                style={{
                  width: "100%",
                  textAlign: "left",
                  height: 75,
                  overflow: "hidden",
                }}
              >
                {item.item.bookReview}
              </Text>
              <Text style={{ width: "100%", textAlign: "left", fontSize: 10 }}>
                Kategori : {item.item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key.toString()}
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
    borderTopWidth: 1,
    borderTopColor: "#393e46",
  },
});
