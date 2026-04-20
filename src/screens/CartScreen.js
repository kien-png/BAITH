import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

// IMPORT DỮ LIỆU TỪ FILE DATA CHUNG
import { INITIAL_CART_DATA } from '../data/data';
import { saveCart, getCart, saveOrder, clearCart } from '../services/storageService'; 

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_DATA);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await getCart();
      if (savedCart.length > 0) {
        setCartItems(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Hàm tăng/giảm số lượng sản phẩm
  const updateQuantity = async (id, delta) => {
    const updated = cartItems.map(item => 
      item.id === id ? { ...item, amount: Math.max(1, item.amount + delta) } : item
    );
    setCartItems(updated);
    await saveCart(updated);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    await saveCart(updated);
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + (price * (item.amount || 1));
  }, 0).toFixed(2);

  // Component cho từng dòng sản phẩm
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
        
        <Text style={styles.itemWeight}>{item.weight}, Price</Text>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Ionicons name="remove" size={24} color="#B3B3B3" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.amount}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Ionicons name="add" size={24} color="#53B175" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemPrice}>${(parseFloat(item.price) * item.amount).toFixed(2)}</Text>
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

      {/* FOOTER VỚI NÚT CHECKOUT ĐÃ CÂN GIỮA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          activeOpacity={0.9}
          onPress={async () => {
            try {
              await saveOrder({
                items: cartItems,
                total: totalPrice,
              });
              await clearCart();
              setCartItems([]);
              alert('Order placed successfully!');
            } catch (error) {
              console.error('Checkout error:', error);
            }
          }}
        >
          {/* View trống để cân bằng trọng lượng với phần giá tiền bên phải */}
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
  
  // FOOTER & CHECKOUT BUTTON
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
    flex: 1 // Chiếm không gian giữa để căn giữa chữ
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
  dummySpace: { width: 70 }, // Phải bằng với minWidth của priceTag để chữ ở giữa tuyệt đối
  
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7C7C7C' }
});

export default CartScreen;