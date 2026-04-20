import AsyncStorage from '@react-native-async-storage/async-storage';

// ===== AUTH =====
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

// ===== CART =====
export const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem('cart');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

// ===== ORDERS =====
export const saveOrder = async (order) => {
  try {
    const orders = await getOrders();
    orders.push({
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    await AsyncStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

export const getOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem('orders');
  } catch (error) {
    console.error('Error clearing orders:', error);
  }
};
