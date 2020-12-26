import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Post = () => {
  const [country, setcountry] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.text}>Kitap Adı :</Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TextInput
              style={{
                padding: 10,
                backgroundColor: "#fff",
                flex: 1,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 5,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ zIndex: 5 }}>
          <Text
            style={{
              width: "100%",
              fontSize: 20,
              textAlign: "center",
              paddingVertical: 10,
            }}
          >
            Kitap Hakkındaki Yorumunuz
          </Text>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TextInput
              multiline={true}
              style={{
                padding: 10,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "grey",
                margin: 10,
                borderRadius: 5,
                height: 150,
                justifyContent: "flex-start",
              }}
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
                    value: "bilim",
                  },
                  {
                    label: "Çocuk Kitapları",
                    value: "çocuk",
                  },
                  {
                    label: "Dini",
                    value: "dini",
                  },
                  {
                    label: "Eğitim",
                    value: "eğitim",
                  },
                  {
                    label: "Edebiyat",
                    value: "edebiyat",
                  },
                  {
                    label: "Felsefe",
                    value: "felsefe",
                  },
                  {
                    label: "Kültür",
                    value: "kültür",
                  },
                  {
                    label: "Müzik",
                    value: "müzik",
                  },
                  {
                    label: "Politika",
                    value: "politika",
                  },
                  {
                    label: "Sağlık",
                    value: "sağlık",
                  },
                  {
                    label: "Psikoloji",
                    value: "psikoloji",
                  },
                  {
                    label: "Siyaset",
                    value: "siyaset",
                  },
                  {
                    label: "Tarih",
                    value: "tarih",
                  },
                  {
                    label: "Ekonomi",
                    value: "ekonomi",
                  },
                ]}
                defaultValue={country}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa", zIndex: 10 }}
                itemStyle={{
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  zIndex: 10,
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setcountry(item.value)}
                style={{ zIndex: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            Yayınla
          </Text>
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
  },
});
