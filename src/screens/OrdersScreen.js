import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 🔥 IMPORT STORAGE
import { getOrders, clearOrders } from '../services/storageService';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  // 🔥 LOAD ĐƠN HÀNG KHI MỞ APP
  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrders();
      setOrders(data.reverse()); // đơn mới lên đầu
    };
    loadOrders();
  }, []);

  // 🔥 XÓA TẤT CẢ ĐƠN (optional nhưng tiện test)
  const handleClearOrders = async () => {
    await clearOrders();
    setOrders([]);
  };

  const OrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.orderItems}>
        <Text style={styles.itemsLabel}>Items: {item.items.length}</Text>
        {item.items.slice(0, 2).map((product, idx) => (
          <Text key={idx} style={styles.itemName}>
            • {product.name} x{product.amount || 1}
          </Text>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} more items
          </Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${item.total}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* 🔥 NÚT XÓA (OPTIONAL - tiện test) */}
      {orders.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearOrders}>
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text style={styles.clearButtonText}>Clear Orders</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-outline" size={60} color="#E2E2E2" />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>
              Start shopping to place your first order
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    backgroundColor: 'white',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },

  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  clearButtonText: { color: 'white', fontWeight: '600', fontSize: 14 },

  listContent: { paddingHorizontal: 20, paddingVertical: 15 },

  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#53B175',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },

  orderId: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  orderDate: { fontSize: 12, color: '#7C7C7C' },

  orderItems: { marginBottom: 12 },
  itemsLabel: { fontSize: 14, fontWeight: '600', color: '#181725', marginBottom: 8 },
  itemName: { fontSize: 13, color: '#7C7C7C', marginBottom: 4 },
  moreItems: { fontSize: 12, color: '#53B175', fontStyle: 'italic', marginTop: 4 },

  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
  },

  totalLabel: { fontSize: 14, fontWeight: '600', color: '#7C7C7C' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#53B175' },

  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#181725', marginTop: 15 },
  emptySubtext: { fontSize: 14, color: '#7C7C7C', marginTop: 8 },
});

export default OrdersScreen;