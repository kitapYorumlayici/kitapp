import React, { useState } from "react";
import { StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
} from "native-base";
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
      Alert.alert("Username is required!");
    } else if (!surname) {
      Alert.alert("Email is required!");
    } else if (!email) {
      Alert.alert("Email is required!");
    } else if (!password) {
      Alert.alert("Password is required!");
    } else if (!confirmPwd) {
      Alert.alert("Please confirm password!");
    } else if (password !== confirmPwd) {
      Alert.alert("Password does not match!");
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
        Alert.alert("Bu mail adresine ait hesap bulunmaktadır.");
      }
    }
  };

  return (
    <Container>
      <HomeHeader navigation={navigation} title="Kayıt Ol" />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Adınız</Label>
            <Input
              onChangeText={(nameValue) => {
                setname(nameValue);
              }}
              value={name}
            />
          </Item>
          <Item floatingLabel>
            <Label>Soyadınız</Label>
            <Input
              onChangeText={(surnameValue) => {
                setsurname(surnameValue);
              }}
              value={surname}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={(emailValue) => {
                setemail(emailValue);
              }}
              value={email}
            />
          </Item>
          <Item floatingLabel>
            <Label>Şifre</Label>
            <Input
              onChangeText={(passwordValue) => {
                setpassword(passwordValue);
              }}
              value={password}
            />
          </Item>
          <Item floatingLabel>
            <Label>Şifre(Tekrar)</Label>
            <Input
              onChangeText={(confirmpwdValue) => {
                setconfirmPwd(confirmpwdValue);
              }}
              value={confirmPwd}
            />
          </Item>
          <Button
            onPress={registerUser}
            primary
            style={{ width: "45%", alignSelf: "center", marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", width: "100%" }}>Kayıt OL</Text>
          </Button>
          <Text style={{ fontSize: 12, textAlign: "center", marginTop: 15 }}>
            Zaten bir hesabın var mı? &nbsp;
            <Text
              style={{ color: "black", textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("Giriş Yap");
              }}
            >
              Giriş Yap
            </Text>
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

export default Register;
