import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const ExploreScreen = ({ navigation }) => { // THÊM navigation vào props
  const categories = [
    { id: '1', name: 'Frash Fruits\n& Vegetable', color: '#EEF8F2', border: '#53B175', img: require('../../assets/e1.png') },
    { id: '2', name: 'Cooking Oil\n& Ghee', color: '#FFF6EE', border: '#F8A44C', img: require('../../assets/e2.png') },
    { id: '3', name: 'Meat & Fish', color: '#FDE8E4', border: '#F7A593', img: require('../../assets/e3.png') },
    { id: '4', name: 'Bakery & Snacks', color: '#F4EBF7', border: '#D3B0E0', img: require('../../assets/e4.png') },
    { id: '5', name: 'Dairy & Eggs', color: '#FFF8E5', border: '#FDE598', img: require('../../assets/e5.png') },
    { id: '6', name: 'Beverages', color: '#EDF7FC', border: '#B7DFF5', img: require('../../assets/e6.png') },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* Tiêu đề Find Products giống mẫu image_910fc9.png */}
      <Text style={styles.headerTitle}>Find Products</Text>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color="black" />
        <TextInput 
          placeholder="Search Store" 
          style={styles.searchInput} 
          placeholderTextColor="#7C7C7C"
        />
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 100}}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, {backgroundColor: item.color, borderColor: item.border}]}
            activeOpacity={0.7}
            onPress={() => {
              // Nếu bấm vào Beverages thì chuyển sang màn hình danh sách đồ uống
              if (item.name === 'Beverages') {
                navigation.navigate('Beverages');
              }
            }}
          >
            <Image source={item.img} style={styles.image} resizeMode="contain" />
            <Text style={styles.catName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 15,
    color: '#181725' 
  },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F2F3F2', 
    margin: 20, 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  searchInput: { 
    marginLeft: 10, 
    flex: 1, 
    fontSize: 16,
    fontWeight: '600'
  },
  card: { 
    width: cardWidth, 
    height: 190, 
    margin: 10, 
    borderRadius: 18, 
    borderWidth: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 15 
  },
  image: { width: 90, height: 90 },
  catName: { 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 15, 
    fontSize: 16,
    color: '#181725'
  }
});

export default ExploreScreen;