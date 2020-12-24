import React, { useState } from "react";
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
import HomeHeader from "./HomeHeader";
import * as firebase from "firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginWithemail = () => {
    if (!email) {
      Alert.alert("Please type your email");
    } else if (!password) {
      Alert.alert("Please type your password");
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password);
    }
  };
  return (
    <Container>
      <HomeHeader navigation={navigation} title="Giriş Yap" />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={(emailValue) => {
                setEmail(emailValue);
              }}
              value={email}
            />
          </Item>
          <Item floatingLabel>
            <Label>Şifre</Label>
            <Input
              placeholder="Password"
              onChangeText={(passwordValue) => {
                setpassword(passwordValue);
              }}
              value={password}
            />
          </Item>
          <Button
            onPress={loginWithemail}
            success
            style={{ width: "45%", alignSelf: "center", marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", width: "100%" }}>
              Giriş Yap
            </Text>
          </Button>
          <Text style={{ fontSize: 12, textAlign: "center", marginTop: 15 }}>
            Bir hesaba mı ihtiyacın var? &nbsp;
            <Text
              style={{ color: "black", textDecorationLine: "underline" }}
              onPress={() => {
                navigation.navigate("Kayıt Ol");
              }}
            >
              Kayıt Ol
            </Text>
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
