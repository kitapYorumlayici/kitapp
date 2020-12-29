import React, { useState } from 'react';
import { FlatList, View, Text, SafeAreaView, StyleSheet } from 'react-native';

const CategoriesList = [
    { id: '1', value: 'Bilim & Mühendislik' },
    { id: '2', value: 'Çocuk Kitapları' },
    { id: '3', value: 'Dini' },
    { id: '4', value: 'Eğitim' },
    { id: '5', value: 'Edebiyat' },
    { id: '6', value: 'Felsefe' },
    { id: '7', value: 'Kültür' },
    { id: '8', value: 'Müzik' },
    { id: '9', value: 'Politika' },
    { id: '10', value: 'Sağlık' },
    { id: '11', value: 'Psikoloji' },
    { id: '12', value: 'Siyaset' },
    { id: '13', value: 'Tarih' },
    { id: '14', value: 'Ekonomi' },
  ];

const Categories = () => {
  const [listItems, setListItems] = useState(CategoriesList);

  const ItemView = ({ item }) => {
    return (
      <View>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.value}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const getItem = (item) => {
    alert('Id : ' + item.id + ' Value : ' + item.value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          ItemSeparatorComponent={ItemSeparatorView}
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
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

