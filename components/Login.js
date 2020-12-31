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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginWithemail = async () => {
    if (!email) {
      Alert.alert("Please type your email");
    } else if (!password) {
      Alert.alert("Please type your password");
    } else {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }
  };
  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} title="Giriş Yap" />
      <View style={{ marginVertical: 75 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(emailValue) => {
              setEmail(emailValue);
            }}
            value={email}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(passwordValue) => {
              setpassword(passwordValue);
            }}
            textContentType="password"
            value={password}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.btn} onPress={loginWithemail}>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 16 }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 15 }}>
          Bir hesaba mı ihtiyacın var? &nbsp;
          <Text
            style={{
              color: "black",
              textDecorationLine: "underline",
              fontSize: 16,
            }}
            onPress={() => {
              navigation.navigate("Kayıt Ol");
            }}
          >
            Kayıt Ol
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
});

export default Login;
