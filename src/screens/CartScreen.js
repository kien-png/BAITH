import React, { useState, useEffect } from 'react';
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

// 🔥 IMPORT STORAGE
import { getCart, saveCart, clearCart } from '../services/storageService';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔥 LOAD CART KHI MỞ APP
  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(data);
    };
    loadCart();
  }, []);

  // 🔥 UPDATE + LƯU
  const updateQuantity = async (id, delta) => {
    let newCart = cartItems.map(item => 
      item.id === id 
        ? { ...item, amount: Math.max(1, (item.amount || 1) + delta) } 
        : item
    );

    setCartItems(newCart);
    await saveCart(newCart);
  };

  // 🔥 XÓA + LƯU
  const removeItem = async (id) => {
    let newCart = cartItems.filter(item => item.id !== id);

    setCartItems(newCart);
    await saveCart(newCart);
  };

  // 🔥 CHECKOUT (CHỈ CLEAR CART - ORDER LÀM Ở SCREEN KHÁC)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    alert("Checkout thành công (demo)");
    await clearCart();
    setCartItems([]);
  };

  // 🔥 TỔNG TIỀN
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + (price * (item.amount || 1));
  }, 0).toFixed(2);

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.img} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="close" size={22} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemWeight}>{item.weight}</Text>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Ionicons name="remove" size={24} color="#B3B3B3" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.amount || 1}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Ionicons name="add" size={24} color="#53B175" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemPrice}>
            ${(parseFloat(item.price) * (item.amount || 1)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống.</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          activeOpacity={0.9}
          onPress={handleCheckout}
        >
          <View style={styles.dummySpace} /> 
          
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>${totalPrice}</Text>
          </View>
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
  listContent: { paddingHorizontal: 20, paddingBottom: 110 },
  separator: { height: 1, backgroundColor: '#E2E2E2' },
  cartItem: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  itemImage: { width: 80, height: 80, marginRight: 20 },
  itemDetails: { flex: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725', flex: 1, marginRight: 10 },
  itemWeight: { fontSize: 14, color: '#7C7C7C', marginVertical: 5 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { 
    width: 45, 
    height: 45, 
    borderRadius: 17, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  quantityText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, color: '#181725' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    backgroundColor: 'white' 
  },
  checkoutButton: { 
    backgroundColor: '#53B175', 
    borderRadius: 19, 
    height: 67, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  checkoutText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '600', 
    textAlign: 'center',
    flex: 1 
  },
  priceTag: { 
    backgroundColor: '#489E67', 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center'
  },
  priceTagText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  dummySpace: { width: 70 },
  
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7C7C7C' }
});

export default CartScreen;