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
  { id: "1", title: "Bilim & Mühendislik" },
  { id: "2", title: "Çocuk Kitapları" },
  { id: "3", title: "Dini" },
  { id: "4", title: "Eğitim" },
  { id: "5", title: "Edebiyat" },
  { id: "6", title: "Felsefe" },
  { id: "7", title: "Kültür" },
  { id: "8", title: "Müzik" },
  { id: "9", title: "Politika" },
  { id: "10", title: "Sağlık" },
  { id: "11", title: "Psikoloji" },
  { id: "12", title: "Siyaset" },
  { id: "13", title: "Tarih" },
  { id: "14", title: "Ekonomi" },
];

const Categories = ({ navigation }) => {
  const [listItems, setListItems] = useState(CategoriesList);

  const FlatItem = ({ item }) => {
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
          renderItem={FlatItem}
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
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  item: {
    padding: 10,
    height: 44,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eaeaea",
  },
  text: {
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    color: "#3f3f44",
  },
});
