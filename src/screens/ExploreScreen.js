import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TextInput, 
  FlatList, TouchableOpacity, Image, Dimensions, StatusBar 
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// Import dữ liệu và các mảng data
import { BEVERAGES_DATA, DAIRY_EGG_DATA, EXCLUSIVE_OFFER_DATA, BEST_SELLING_DATA } from '../data/data';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; 

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Fresh Fruits\n& Vegetable', color: '#EEF8F2', border: '#53B175', img: require('../../assets/e1.png') },
    { id: '2', name: 'Cooking Oil\n& Ghee', color: '#FFF6EE', border: '#F8A44C', img: require('../../assets/e2.png') },
    { id: '3', name: 'Meat & Fish', color: '#FDE8E4', border: '#F7A593', img: require('../../assets/e3.png') },
    { id: '4', name: 'Bakery & Snacks', color: '#F4EBF7', border: '#D3B0E0', img: require('../../assets/e4.png') },
    { id: '5', name: 'Dairy & Eggs', color: '#FFF8E5', border: '#FDE598', img: require('../../assets/e5.png') },
    { id: '6', name: 'Beverages', color: '#EDF7FC', border: '#B7DFF5', img: require('../../assets/e6.png') },
  ];

  // Gom tất cả sản phẩm lại để tìm kiếm
  const allProducts = [...BEVERAGES_DATA, ...DAIRY_EGG_DATA, ...EXCLUSIVE_OFFER_DATA, ...BEST_SELLING_DATA];
  
  const isSearching = searchQuery.length > 0;
  
  // Lọc dữ liệu dựa trên việc có đang tìm kiếm hay không
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- COMPONENT THẺ SẢN PHẨM (Dùng khi tìm kiếm) ---
  const ProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { 
        pName: item.name, pPrice: item.price, pImg: item.img, pWeight: item.weight 
      })}
    >
      <Image source={item.img} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productWeight}>{item.weight}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // --- COMPONENT Ô DANH MỤC (Dùng khi bình thường) ---
  const CategoryCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.catCard, { backgroundColor: item.color, borderColor: item.border }]}
      onPress={() => {
        if (item.name === 'Beverages') navigation.navigate('Beverages');
        if (item.name.includes('Dairy & Eggs')) navigation.navigate('DairyEgg');
      }}
    >
      <Image source={item.img} style={styles.catImage} resizeMode="contain" />
      <Text style={styles.catName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>Find Products</Text>
      
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="black" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput} 
            placeholderTextColor="#7C7C7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {isSearching && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Filter')}>
          <Feather name="sliders" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={isSearching ? filteredProducts : categories}
        numColumns={2}
        key={isSearching ? 'products' : 'categories'} // Quan trọng: Đổi key để FlatList render lại khi đổi số cột hoặc kiểu card
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => isSearching ? <ProductCard item={item} /> : <CategoryCard item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 15, color: '#181725' },
  
  searchSection: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 20 },
  searchBar: { flexDirection: 'row', backgroundColor: '#F2F3F2', flex: 1, padding: 12, borderRadius: 15, alignItems: 'center' },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
  filterButton: { marginLeft: 15 },

  listContent: { paddingHorizontal: 15, paddingBottom: 100 },

  // STYLE Ô DANH MỤC
  catCard: { width: cardWidth, height: 190, margin: 10, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 15 },
  catImage: { width: 80, height: 80 },
  catName: { fontWeight: 'bold', textAlign: 'center', marginTop: 15, fontSize: 14, color: '#181725' },

  // STYLE THẺ SẢN PHẨM (GIỐNG BEVERAGES/DAIRY)
  productCard: { 
    width: cardWidth, 
    height: 250, 
    borderRadius: 18, 
    padding: 15, 
    margin: 10, 
    borderWidth: 1, 
    borderColor: '#E2E2E2',
    backgroundColor: 'white'
  },
  productImage: { width: '100%', height: 100, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productWeight: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { backgroundColor: '#53B175', borderRadius: 17, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
});

export default ExploreScreen;