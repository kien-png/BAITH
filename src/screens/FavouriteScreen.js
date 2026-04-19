import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

// Import dữ liệu nước uống để làm danh sách yêu thích
import { BEVERAGES_DATA } from '../data/data'; 

const FavouriteScreen = ({ navigation }) => {

  const FavouriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', { pName: item.name, pPrice: item.price, pImg: item.img, pWeight: item.weight })}
    >
      <Image source={item.img} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Entypo name="chevron-right" size={24} color="#181725" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorurite</Text>
      </View>

      <FlatList
        data={BEVERAGES_DATA}
        renderItem={({ item }) => <FavouriteItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    paddingVertical: 20, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2' 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  separator: { height: 1, backgroundColor: '#E2E2E2' },
  
  itemContainer: { 
    flexDirection: 'row', 
    paddingVertical: 15, 
    alignItems: 'center' 
  },
  itemImage: { width: 60, height: 60, marginRight: 20 },
  infoContainer: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemWeight: { fontSize: 14, color: '#7C7C7C', marginTop: 3 },
  
  rightContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  itemPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#181725', 
    marginRight: 10 
  },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    backgroundColor: 'white' 
  },
  addButton: { 
    backgroundColor: '#53B175', 
    borderRadius: 19, 
    height: 67, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  addButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '600' 
  },
});

export default FavouriteScreen;