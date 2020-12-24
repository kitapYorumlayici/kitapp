import * as React from "react";
import { Text, View, Button, Alert } from "react-native";
import * as firebase from "firebase";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Maing Page!</Text>
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
  );
}
