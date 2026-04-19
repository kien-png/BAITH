// --- 1. NƯỚC UỐNG (BEVERAGES) ---
export const BEVERAGES_DATA = [
  { id: 'b1', name: 'Diet Coke', weight: '355ml', price: 1.99, img: require('../../assets/coke.png') },
  { id: 'b2', name: 'Sprite Can', weight: '325ml', price: 1.50, img: require('../../assets/spike.png') },
  { id: 'b3', name: 'Apple & Grape Juice', weight: '2L', price: 15.50, img: require('../../assets/nho.png') },
  { id: 'b4', name: 'Orange Juice', weight: '2L', price: 15.99, img: require('../../assets/cam.png') },
  { id: 'b5', name: 'Coca Cola Can', weight: '325ml', price: 4.99, img: require('../../assets/coca.png') },
  { id: 'b6', name: 'Pepsi Can', weight: '330ml', price: 4.99, img: require('../../assets/pessi.png') },
];

// --- 2. TRỨNG & SỮA (DAIRY & EGG) ---
export const DAIRY_EGG_DATA = [
  { id: 'd1', name: 'Egg Chicken Red', weight: '4pcs', price: 1.99, img: require('../../assets/egg_chicken_white.png') }, 
  { id: 'd2', name: 'Egg Chicken White', weight: '180g', price: 1.50, img: require('../../assets/egg_chicken_white.png') },
  { id: 'd3', name: 'Egg Pasta', weight: '30g', price: 15.99, img: require('../../assets/egg_pasta.png') },
  { id: 'd4', name: 'Egg Noodles (Long)', weight: '2L', price: 15.99, img: require('../../assets/egg_Noodles.png') },
  { id: 'd5', name: 'Mayonnais Eggless', weight: 'Packet', price: 4.99, img: require('../../assets/mayonnais_eggless.png') },
  { id: 'd6', name: 'Egg Noodles (Small)', weight: '3 Servings', price: 3.99, img: require('../../assets/egg_noodle.png') },
];

// --- 3. ƯU ĐÃI ĐỘC QUYỀN (EXCLUSIVE OFFER) ---
export const EXCLUSIVE_OFFER_DATA = [
  { id: 'e1', name: 'Organic Bananas', weight: '7pcs', price: 4.99, img: require('../../assets/chuoi.png') },
  { id: 'e2', name: 'Red Apple', weight: '1kg', price: 4.99, img: require('../../assets/tao.png') },
];

// --- 4. BÁN CHẠY (BEST SELLING) ---
export const BEST_SELLING_DATA = [
  { id: 's1', name: 'Bell Pepper Red', weight: '1kg', price: 4.99, img: require('../../assets/otchuong.jpg') },
  { id: 's2', name: 'Ginger', weight: '250g', price: 4.99, img: require('../../assets/gung.jpg') },
];

// --- 5. TẠP HÓA (GROCERIES) ---
export const GROCERIES_DATA = [
  { id: 'g1', name: 'Beef Bone', weight: '1kg', price: 4.99, img: require('../../assets/thitbo.png') },
  { id: 'g2', name: 'Broiler Chicken', weight: '1kg', price: 4.99, img: require('../../assets/ga.png') },
];

// --- 6. DỮ LIỆU GIỎ HÀNG MẶC ĐỊNH (CART) ---
export const INITIAL_CART_DATA = [
  { id: 's1', name: 'Bell Pepper Red', weight: '1kg', price: 4.99, amount: 1, img: require('../../assets/otchuong.jpg') },
  { id: 'g2', name: 'Broiler Chicken', weight: '1kg', price: 4.99, amount: 1, img: require('../../assets/ga.png') },
  { id: 'e1', name: 'Organic Bananas', weight: '12kg', price: 3.00, amount: 1, img: require('../../assets/chuoi.png') },
  { id: 's2', name: 'Ginger', weight: '250gm', price: 2.99, amount: 1, img: require('../../assets/gung.jpg') },
];