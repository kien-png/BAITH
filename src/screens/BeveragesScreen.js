import React, { useState, useEffect } from 'react'; // 1. Thêm Hook để xử lý lọc
import { 
  View, Text, StyleSheet, SafeAreaView, FlatList, 
  Image, TouchableOpacity, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tải dữ liệu gốc
import { BEVERAGES_DATA } from '../data/data'; 

const BakeryScreen = ({ navigation, route }) => { // 2. Thêm route để nhận dữ liệu từ Filter

  // 3. State để danh sách có thể thay đổi khi lọc
  const [data, setData] = useState(BEVERAGES_DATA);

  // 4. LOGIC LỌC (Giữ nguyên logic nhưng không đụng vào giao diện)
  useEffect(() => {
    if (route.params?.appliedCategories || route.params?.appliedBrands) {
      const filtersCats = route.params.appliedCategories || [];
      const filterBrands = route.params.appliedBrands || [];

      if (filtersCats.length === 0 && filterBrands.length === 0) {
        setData(BEVERAGES_DATA);
      } else {
        const filtered = BEVERAGES_DATA.filter(item => {
          const itemName = item.name.toLowerCase();
          const matchCat = filtersCats.length === 0 || 
            filtersCats.some(cat => itemName.includes(cat.toLowerCase()));
          const matchBrand = filterBrands.length === 0 || 
            filterBrands.some(brand => itemName.includes(brand.toLowerCase()));
          return matchCat && matchBrand;
        });
        setData(filtered);
      }
    }
  }, [route.params]);

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
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header GIỮ NGUYÊN STYLE CỦA BẠN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bakery & Snacks</Text>
        
        {/* Nút lọc: Chỉ thêm onPress để mở trang Filter */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Filter', { 
            source: 'Bakery', // Để Apply xong nó biết đường quay lại đây
            selectedCategories: route.params?.appliedCategories || [],
            selectedBrands: route.params?.appliedBrands || []
          })}
        >
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data} // Dùng data từ state đã lọc
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // Hiển thị thông báo nếu lọc không ra gì
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm phù hợp.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// GIỮ NGUYÊN 100% STYLE CŨ CỦA BẠN
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E2E2' 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  listContent: { paddingHorizontal: 10, paddingTop: 10, paddingBottom: 30 },
  card: { 
    flex: 1, 
    margin: 8, 
    padding: 15, 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    backgroundColor: 'white' 
  },
  imageContainer: { alignItems: 'center', justifyContent: 'center', height: 100, marginBottom: 15 },
  image: { width: '90%', height: '100%' },
  name: { fontSize: 16, fontWeight: 'bold', height: 42, color: '#181725' },
  weight: { color: '#7C7C7C', fontSize: 14, marginTop: 3 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addButton: { 
    backgroundColor: '#53B175', 
    borderRadius: 14, 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#7C7C7C', fontSize: 16 }
});

export default BakeryScreen;