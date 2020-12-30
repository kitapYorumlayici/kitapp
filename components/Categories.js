import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CategoriesList = [
  { id: "1", title: "Bilim & Mühendislik", value: "bilim" },
  { id: "2", title: "Çocuk Kitapları", value: "çocuk" },
  { id: "3", title: "Dini", value: "dini" },
  { id: "4", title: "Eğitim", value: "eğitim" },
  { id: "5", title: "Edebiyat", value: "edebiyat" },
  { id: "6", title: "Felsefe", value: "felsefe" },
  { id: "7", title: "Kültür", value: "kültür" },
  { id: "8", title: "Müzik", value: "müzik" },
  { id: "9", title: "Politika", value: "politika" },
  { id: "10", title: "Sağlık", value: "sağlık" },
  { id: "11", title: "Psikoloji", value: "psikoloji" },
  { id: "12", title: "Siyaset", value: "siyaset" },
  { id: "13", title: "Tarih", value: "tarih" },
  { id: "14", title: "Ekonomi", value: "ekonomi" },
];

const Categories = ({ navigation }) => {
  const [listItems, setListItems] = useState(CategoriesList);

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("List Screen", { item: item });
        }}
      >
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginVertical: 10,
  },
  item: {
    padding: 10,
    height: 44,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor:"#aeaeae"
  },
  text: {
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
});
