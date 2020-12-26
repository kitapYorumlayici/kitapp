import { Alert } from "react-native";
import * as firebase from "firebase";

export const AddUser = async (name, surname, email, uid) => {
  try {
    return await firebase.database().ref(`users/${uid}`).set({
      name: name,
      surname: surname,
      email: email,
      uid: uid,
    });
  } catch (error) {
    Alert.alert(error);
  }
};
