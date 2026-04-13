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
import { Ionicons } from '@expo/vector-icons';

const BeveragesScreen = ({ navigation }) => {
  // Dữ liệu mẫu khớp với hình ảnh image_91f84a.png
  const data = [
    { id: '1', name: 'Diet Coke', weight: '355ml', price: '1.99', img: require('../../assets/coke.png') },
    { id: '2', name: 'Sprite Can', weight: '325ml', price: '1.50', img: require('../../assets/spike.png') },
    { id: '3', name: 'Apple & Grape Juice', weight: '2L', price: '15.99', img: require('../../assets/nho.png') },
    { id: '4', name: 'Orange Juice', weight: '2L', price: '15.99', img: require('../../assets/cam.png') },
    { id: '5', name: 'Coca Cola Can', weight: '325ml', price: '4.99', img: require('../../assets/coca.png') },
    { id: '6', name: 'Pepsi Can', weight: '330ml', price: '4.99', img: require('../../assets/pessi.png') },
  ];

  const ProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { 
        pName: item.name, 
        pPrice: item.price, 
        pImg: item.img, 
        pWeight: item.weight 
      })}
    >
      <View style={styles.imageContainer}>
        <Image source={item.img} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.weight}>{item.weight}, Price</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => console.log("Added to cart:", item.name)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header chuẩn theo thiết kế */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm dạng Grid 2 cột */}
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#181725' 
  },
  listContent: { 
    paddingHorizontal: 10, 
    paddingBottom: 30 
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: 'white',
    // Đổ bóng nhẹ cho card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 15
  },
  image: { 
    width: '80%', 
    height: '100%' 
  },
  name: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    height: 42,
    color: '#181725'
  },
  weight: { 
    color: '#7C7C7C', 
    fontSize: 14, 
    marginTop: 3 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 15 
  },
  price: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#181725'
  },
  addButton: { 
    backgroundColor: '#53B175', // Màu xanh đặc trưng của app
    borderRadius: 14, 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default BeveragesScreen;