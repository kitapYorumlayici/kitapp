import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

const Post = ({ navigation }) => {
  const [category, setcategory] = useState(null);
  const [bookName, setbookName] = useState("");
  const [bookReview, setbookReview] = useState("");
  const [spinner, setSpinner] = useState(false);

  const sendPost = () => {
    if (!category) {
      Alert.alert("Lütfen kategori seçiniz.");
    } else if (!bookName) {
      Alert.alert("Lütfen kitap adı giriniz.");
    } else if (!bookReview) {
      Alert.alert("Yorum kısmı boş bırakılamaz.");
    } else {
      const post = {
        author: firebase.auth().currentUser.uid,
        category: category,
        bookName: bookName,
        bookReview: bookReview,
        starCount: 0,
      };
      setSpinner(true);
      firebase.database().ref(`posts`).push(post);
      setbookName("");
      setbookReview("");
      setcategory(null);
      setSpinner(false);
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={"Yorumunuz yayınlanıyor."}
        textStyle={{ color: "white" }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.text}>Kitap Adı :</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TextInput
              style={styles.textInput}
              onChangeText={(bookNameValue) => {
                setbookName(bookNameValue);
              }}
              value={bookName}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ zIndex: 5 }}>
          <Text style={styles.textTitle}>Kitap Hakkındaki Yorumunuz</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TextInput
              multiline={true}
              style={styles.textArea}
              onChangeText={(reviewValue) => {
                setbookReview(reviewValue);
              }}
              value={bookReview}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Kategori seç :</Text>
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <DropDownPicker
                items={[
                  {
                    label: "Bilim & Mühendislik",
                    value: "Bilim & Mühendislik",
                  },
                  {
                    label: "Çocuk Kitapları",
                    value: "Çocuk Kitapları",
                  },
                  {
                    label: "Dini",
                    value: "Dini",
                  },
                  {
                    label: "Eğitim",
                    value: "Eğitim",
                  },
                  {
                    label: "Edebiyat",
                    value: "Edebiyat",
                  },
                  {
                    label: "Felsefe",
                    value: "Felsefe",
                  },
                  {
                    label: "Kültür",
                    value: "Kültür",
                  },
                  {
                    label: "Müzik",
                    value: "Müzik",
                  },
                  {
                    label: "Politika",
                    value: "Politika",
                  },
                  {
                    label: "Sağlık",
                    value: "Sağlık",
                  },
                  {
                    label: "Psikoloji",
                    value: "Psikoloji",
                  },
                  {
                    label: "Siyaset",
                    value: "Siyaset",
                  },
                  {
                    label: "Tarih",
                    value: "Tarih",
                  },
                  {
                    label: "Ekonomi",
                    value: "Ekonomi",
                  },
                ]}
                placeholder="Kategori seç"
                defaultValue={category}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa", zIndex: 10 }}
                itemStyle={{
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  zIndex: 10,
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setcategory(item.value)}
                style={{ zIndex: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={sendPost}>
          <Text style={styles.buttonText}>Yayınla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    width: "15%",
    width: "25%",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
  btn: {
    paddingHorizontal: 2,
    paddingVertical: 15,
    backgroundColor: "#6f9eaf",
    width: "35%",
    borderRadius: 50,
    marginVertical: 15,
    alignSelf: "center",
    shadowColor: "#6f9eaf",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,

    elevation: 25,
  },
  textArea: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    margin: 10,
    borderRadius: 5,
    height: 150,
    justifyContent: "flex-start",
  },
  textTitle: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
  },
  textInput: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
    color: "white",
  },
});
