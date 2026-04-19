import React, { useState, useEffect } from 'react'; // 1. Thêm useState và useEffect
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

// IMPORT DỮ LIỆU
import { DAIRY_EGG_DATA } from '../data/data'; 

const DairyEggScreen = ({ navigation, route }) => {

  // 2. State quản lý danh sách sản phẩm hiển thị
  const [data, setData] = useState(DAIRY_EGG_DATA);

  // 3. LOGIC NHẬN DỮ LIỆU LỌC (Giống hệt bên Bakery)
  useEffect(() => {
    if (route.params?.appliedCategories || route.params?.appliedBrands) {
      const filtersCats = route.params.appliedCategories || [];
      const filterBrands = route.params.appliedBrands || [];

      if (filtersCats.length === 0 && filterBrands.length === 0) {
        setData(DAIRY_EGG_DATA);
      } else {
        const filtered = DAIRY_EGG_DATA.filter(item => {
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
  }, [route.params?.appliedCategories, route.params?.appliedBrands]);

  // Component con hiển thị sản phẩm (Giữ nguyên giao diện của bạn)
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
      
      {/* HEADER GIỮ NGUYÊN STYLE CỦA BẠN */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Dairy & Eggs</Text>
        
        {/* NÚT LỌC: Đã thêm logic mở Filter và gửi source */}
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter', { 
            source: 'DairyEgg', 
            selectedCategories: route.params?.appliedCategories || [],
            selectedBrands: route.params?.appliedBrands || []
          })}
        >
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* DANH SÁCH SẢN PHẨM */}
      <FlatList
        data={data} // Dùng data từ state đã lọc
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm phù hợp.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// GIỮ NGUYÊN 100% STYLE GỐC CỦA HOÀNG
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E2E2',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#181725' 
  },
  backButton: { padding: 5 },
  filterButton: { padding: 5 },
  listContent: { 
    paddingHorizontal: 10, 
    paddingTop: 10, 
    paddingBottom: 30 
  },
  card: { 
    flex: 1, 
    margin: 8, 
    padding: 15, 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    backgroundColor: 'white' 
  },
  imageContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 100, 
    marginBottom: 15 
  },
  image: { 
    width: '100%', 
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
    backgroundColor: '#53B175', 
    borderRadius: 14, 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    color: '#7C7C7C',
    fontSize: 16
  }
});

export default DairyEggScreen;