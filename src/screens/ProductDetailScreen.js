import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ FIX warning
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route, navigation }) => {

  // ✅ Nhận dữ liệu từ Home
  const data = route?.params || {};

  const pName = data.name || "Naturel Red Apple";
  const pPrice = data.price || 4.99;
  const pWeight = data.weight || "1kg";
  const pImg = data.img || require('../../assets/tao.png');

  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#181725" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE */}
        <View style={styles.imageBox}>
          <Image source={pImg} style={styles.image} resizeMode="contain" />

          <View style={styles.dotContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* NAME */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{pName}</Text>
              <Text style={styles.weight}>{pWeight}, Price</Text>
            </View>

            <TouchableOpacity>
              <Ionicons name="heart-outline" size={26} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          {/* QUANTITY */}
          <View style={styles.quantityRow}>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Ionicons name="remove" size={26} color="#B3B3B3" />
              </TouchableOpacity>

              <View style={styles.box}>
                <Text style={styles.qty}>{quantity}</Text>
              </View>

              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add" size={26} color="#53B175" />
              </TouchableOpacity>
            </View>

            <Text style={styles.price}>
              ${ (pPrice * quantity).toFixed(2) }
            </Text>
          </View>

          <View style={styles.divider} />

          {/* PRODUCT DETAIL */}
          <View style={styles.expandRow}>
            <Text style={styles.title}>Product Detail</Text>
            <Ionicons name="chevron-down" size={22} color="#181725" />
          </View>

          <Text style={styles.desc}>
            Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart.
          </Text>

          <View style={styles.divider} />

          {/* NUTRITIONS */}
          <View style={styles.expandRow}>
            <Text style={styles.title}>Nutritions</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>100gr</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </View>
          </View>

          <View style={styles.divider} />

          {/* REVIEW */}
          <View style={styles.expandRow}>
            <Text style={styles.title}>Review</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {[1,2,3,4,5].map(i => (
                <Ionicons key={i} name="star" size={16} color="#F3603F" />
              ))}
              <Ionicons name="chevron-forward" size={20} style={{ marginLeft: 5 }} />
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add To Basket</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;


// ✅ STYLE (KHÔNG ĐƯỢC THIẾU)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },

  imageBox: {
    backgroundColor: '#F2F3F2',
    height: 300,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: { width: 400, height: 400 },

  dotContainer: { flexDirection: 'row', marginTop: 10 },

  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#B3B3B3',
    borderRadius: 3,
    marginHorizontal: 3
  },

  activeDot: {
    width: 15,
    backgroundColor: '#53B175'
  },

  content: { padding: 25 },

  row: { flexDirection: 'row', justifyContent: 'space-between' },

  name: { fontSize: 22, fontWeight: 'bold', color: '#181725' },

  weight: { color: '#7C7C7C', marginTop: 5 },

  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25
  },

  counter: { flexDirection: 'row', alignItems: 'center' },

  box: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10
  },

  qty: { fontSize: 16, fontWeight: 'bold' },

  price: { fontSize: 22, fontWeight: 'bold', color: '#181725' },

  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 15
  },

  expandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: { fontSize: 16, fontWeight: '600', color: '#181725' },

  desc: { color: '#7C7C7C', marginTop: 10 },

  tag: {
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    paddingHorizontal: 6,
    marginRight: 5
  },

  tagText: { fontSize: 10, color: '#7C7C7C' },

  button: {
    backgroundColor: '#53B175',
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});