import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import HomeHeader from "./HomeHeader";
import * as firebase from "firebase";
import { AddUser } from "../users/AddUser";

const Register = ({ navigation }) => {
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPwd, setconfirmPwd] = useState("");

  const registerUser = async () => {
    if (!name) {
      Alert.alert("Ad'ınızı boş bırakamazsınız.");
    } else if (!surname) {
      Alert.alert("Şifre'nizi boş bırakamazsınız.");
    } else if (!email) {
      Alert.alert("Email'inizi boş bırakamazsınız.");
    } else if (!password) {
      Alert.alert("Şifren'izi boş bırakamazsınız.");
    } else if (!confirmPwd) {
      Alert.alert("Şifre'nizi onaylayınız.");
    } else if (password !== confirmPwd) {
      Alert.alert("Şifreler eşleşmelidir.");
    } else {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            let uid = firebase.auth().currentUser.uid;
            AddUser(name, surname, email, uid);
          });
      } catch (error) {
        return Alert.alert("Bu mail adresine ait hesap bulunmaktadır.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} title="Kayıt Ol" />
      <View style={{ marginVertical: 75 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            onChangeText={(nameValue) => {
              setname(nameValue);
            }}
            value={name}
            placeholder="Adınız"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            onChangeText={(surnameValue) => {
              setsurname(surnameValue);
            }}
            value={surname}
            placeholder="Soyadınız"
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            onChangeText={(emailValue) => {
              setemail(emailValue);
            }}
            value={email}
            placeholder="Email"
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            onChangeText={(passwordValue) => {
              setpassword(passwordValue);
            }}
            value={password}
            placeholder="Şifre"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            onChangeText={(confirmpwdValue) => {
              setconfirmPwd(confirmpwdValue);
            }}
            value={confirmPwd}
            placeholder="Şifre(Tekrar)"
          />
        </TouchableWithoutFeedback>

        <TouchableOpacity style={styles.btn} onPress={registerUser}>
          <Text style={styles.btnText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 15 }}>
          Zaten bir hesabın var mı? &nbsp;
          <Text
            style={{
              color: "black",
              textDecorationLine: "underline",
              fontSize: 16,
            }}
            onPress={() => {
              navigation.navigate("Giriş Yap");
            }}
          >
            Giriş Yap
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 5,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    fontSize: 16,
  },
  btn: {
    paddingHorizontal: 2,
    paddingVertical: 15,
    borderColor: "transparent",
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
  btnText: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Register;