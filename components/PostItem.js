import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

const PostItem = ({ route }) => {
  const { item } = route.params;
  const [post, setpost] = useState({});
  const [author, setauthor] = useState([]);
  const [spinner, setspinner] = useState(true);
  const [isLiked, setisLiked] = useState(false);
  const [currentUser, setcurrentUser] = useState([]);

  const getUserAndPost = () => {
    firebase
      .database()
      .ref("users/" + item.author)
      .on("value", (snapshot) => {
        setauthor([]);
        let user = {
          email: snapshot.val().email,
          name: snapshot.val().name,
          surname: snapshot.val().surname,
          uid: snapshot.val().uid,
          token: snapshot.val().token,
        };
        setauthor(user);
      });
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        setcurrentUser([]);
        let user = {
          email: snapshot.val().email,
          name: snapshot.val().name,
          surname: snapshot.val().surname,
          uid: snapshot.val().uid,
          token: snapshot.val().token,
        };
        setcurrentUser(user);
      });

    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/like`)
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (child.val() == item.key) {
            setisLiked(true);
          }
        });
      });

    firebase
      .database()
      .ref("posts/" + item.key)
      .on("value", (snapshot) => {
        setpost({});
        let bookName = snapshot.val().bookName;
        let bookReview = snapshot.val().bookReview;
        let category = snapshot.val().category;
        let starCount = snapshot.val().starCount;
        let newPost = {
          bookName,
          bookReview,
          category,
          starCount,
        };
        setpost(newPost);
        setspinner(false);
      });
  };

  const like = () => {
    let likeditem = item.key;
    if (isLiked == false) {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/like")
        .push(likeditem);

      firebase
        .database()
        .ref("posts/" + item.key)
        .update({
          starCount: post.starCount + 1,
        });
      setisLiked(true);
      sendPushNotification();
    } else {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/like")
        .once("value", (snapshot) => {
          snapshot.forEach((childsnapshot) => {
            if (childsnapshot.val() == item.key) {
              firebase
                .database()
                .ref(
                  "users/" +
                    firebase.auth().currentUser.uid +
                    "/like/" +
                    childsnapshot.key
                )
                .remove();
            }
          });
        });
      firebase
        .database()
        .ref("posts/" + item.key)
        .update({
          starCount: post.starCount - 1,
        });

      setisLiked(false);
      sendPushNotification();
    }
  };

  const sendPushNotification = async () => {
    const message = {
      to: author.token,
      sound: "default",
      title: "Bazı değişiklikler var",
      body:
        isLiked == false
          ? currentUser.name +
            " ," +
            post.bookName +
            " adlı kitap için yazdığın yorumunu beğendi."
          : currentUser.name +
            " ," +
            post.bookName +
            " adlı kitap için yazdığın yorumundaki beğenisini geri aldı.",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  useEffect(() => {
    getUserAndPost();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={""}
        textStyle={{ color: "white" }}
      />
      <ScrollView style={styles.insideContainer}>
        <Text style={styles.textname}>{post.bookName}</Text>
        <Text style={styles.textReview}>{post.bookReview}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={{ alignSelf: "center" }}>
          Yorumu yazan : {author.name + " " + author.surname} {"\n\n"}
          Beğeni Sayısı : {post.starCount}
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={like}>
            <Text style={styles.btnText}>
              {isLiked ? "Beğeniyi \n Kaldır" : "Beğen"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  insideContainer: {
    flex: 1,
  },
  textname: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 20,
  },
  textReview: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    position: "relative",
    bottom: 0,
    width: "100%",
    padding: 20,
    flexDirection: "row",
  },
  btn: {
    width: "50%",
    alignSelf: "flex-end",
    paddingHorizontal: 2,
    paddingVertical: 15,
    borderColor: "transparent",
    backgroundColor: "#6f9eaf",
    shadowColor: "#6f9eaf",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 25,
    borderRadius: 20,
  },
  btnContainer: {
    flex: 1,
  },
  btnText: {
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },
});