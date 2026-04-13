import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TextInput, Image, TouchableOpacity, Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 50;

const HomeScreen = ({ navigation }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleBannerScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentBannerIndex(Math.round(index));
  };

  // ===== PRODUCT CARD (Dùng cho Exclusive & Best Selling) =====
  const ProductCard = ({ name, weight, price, img }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          pName: name,
          pPrice: price,
          pImg: img,
          pWeight: weight
        })
      }
    >
      <Image source={img} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={1}>{name}</Text>
      <Text style={styles.productWeight}>{weight}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.productPrice}>${price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // ===== CATEGORY CARD (Dùng cho Groceries - Chữ bên phải ảnh) =====
  const CategoryCard = ({ name, backgroundColor, img }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor }]}
      activeOpacity={0.7}
    >
      <Image source={img} style={styles.categoryImage} resizeMode="contain" />
      <Text style={styles.categoryName}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="carrot" size={30} color="#F3603F" />
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={18} color="#4C4F4D" />
          <Text style={styles.locationText}>Dhaka, Banasree</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* SEARCH */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#181725" />
            <TextInput placeholder="Search Store" style={styles.searchInput} />
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.bannerContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleBannerScroll}>
            <Image source={require('../../assets/banner2.png')} style={styles.bannerImage} />
            <Image source={require('../../assets/banner1.png')} style={styles.bannerImage} />
          </ScrollView>
          <View style={styles.paginationDots}>
            {[0, 1].map((i) => (
              <View key={i} style={[styles.dot, currentBannerIndex === i ? styles.activeDot : styles.inactiveDot]} />
            ))}
          </View>
        </View>

        {/* 1. EXCLUSIVE OFFER */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <ProductCard name="Organic Bananas" weight="7pcs" price="4.99" img={require('../../assets/chuoi.png')} />
          <ProductCard name="Red Apple" weight="1kg" price="4.99" img={require('../../assets/tao.png')} />
        </ScrollView>

        {/* 2. BEST SELLING */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <ProductCard name="Bell Pepper Red" weight="1kg" price="4.99" img={require('../../assets/otchuong.jpg')} />
          <ProductCard name="Ginger" weight="250g" price="4.99" img={require('../../assets/gung.jpg')} />
        </ScrollView>

        {/* 3. GROCERIES (Nằm dưới Best Selling) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        
        {/* Hàng ngang các danh mục (Pulses, Rice) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <CategoryCard name="Pulses" backgroundColor="#FDE4B8" img={require('../../assets/hat.png')} />
          <CategoryCard name="Rice" backgroundColor="#D3F1E0" img={require('../../assets/gao.png')} />
        </ScrollView>

        {/* Các sản phẩm thuộc Groceries (Thịt bò, Gà) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.horizontalScroll, { marginTop: 20 }]}>
          <ProductCard name="Beef Bone" weight="1kg" price="4.99" img={require('../../assets/thitbo.png')} />
          <ProductCard name="Broiler Chicken" weight="1kg" price="4.99" img={require('../../assets/ga.png')} />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 5 },
  locationText: { fontSize: 18, fontWeight: 'bold' },
  searchSection: { paddingHorizontal: 25, marginTop: 15 },
  searchBar: { flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 15, alignItems: 'center', paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, marginLeft: 10 },
  bannerContainer: { marginTop: 20, marginHorizontal: 25 },
  bannerImage: { width: BANNER_WIDTH, height: 115, borderRadius: 15 },
  paginationDots: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
  activeDot: { width: 16, backgroundColor: '#53B175' },
  inactiveDot: { width: 6, backgroundColor: '#7C7C7C' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 25, alignItems: 'center' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold' },
  seeAll: { color: '#53B175', fontWeight: '600', fontSize: 16 },
  horizontalScroll: { paddingLeft: 25, marginTop: 15 },
  
  // STYLE SẢN PHẨM
  card: { width: 173, height: 250, borderRadius: 18, padding: 15, marginRight: 15, borderWidth: 1, borderColor: '#E2E2E2' },
  productImage: { width: '100%', height: 100, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productWeight: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
  productPrice: { fontSize: 18, fontWeight: 'bold' },
  addButton: { backgroundColor: '#53B175', borderRadius: 17, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },

  // STYLE DANH MỤC (GROCERIES) - SỬA LẠI THEO HÌNH
  categoryCard: { 
    width: 250, // Thẻ dài hơn
    height: 105, 
    borderRadius: 18, 
    flexDirection: 'row', // Ảnh và chữ nằm ngang
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginRight: 15 
  },
  categoryImage: { width: 70, height: 70 },
  categoryName: { fontSize: 20, fontWeight: '600', color: '#3E423F', marginLeft: 15 }
});