import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Post Item", { item: item });
      }}
    >
      <View style={styles.itemcontainer}>
        <Text style={styles.itemname}>{item.bookName}</Text>
        <Text style={styles.itemreview}>
          {item.bookReview.length > 245
            ? item.bookReview.slice(0, 245) + "..."
            : item.bookReview}
        </Text>
        <Text style={{ width: "100%", textAlign: "left", fontSize: 10 }}>
          Kategori : {item.category}
        </Text>
        <Text style={{ width: "100%", textAlign: "left", fontSize: 10 }}>
          {"\n"}Beğeni Sayısı : {item.starCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemcontainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#eaeaea",
    width: "85%",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  itemname: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 16,
  },
  itemreview: {
    width: "100%",
    textAlign: "left",
    height: 75,
    overflow: "hidden",
    marginBottom: 5,
  },
});
