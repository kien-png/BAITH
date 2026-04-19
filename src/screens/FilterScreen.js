import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterScreen = ({ navigation, route }) => {
  // Nhận lại trạng thái đã tích trước đó để không bị mất dấu tích khi mở lại
  const prevCats = route.params?.selectedCategories || [];
  const prevBrds = route.params?.selectedBrands || [];

  const [categories, setCategories] = useState([
    { id: 1, name: 'Eggs', checked: prevCats.includes('Eggs') },
    { id: 2, name: 'Noodles & Pasta', checked: prevCats.includes('Noodles & Pasta') },
    { id: 3, name: 'Chips & Crisps', checked: prevCats.includes('Chips & Crisps') },
    { id: 4, name: 'Fast Food', checked: prevCats.includes('Fast Food') },
  ]);

  const [brands, setBrands] = useState([
    { id: 1, name: 'Individual Collection', checked: prevBrds.includes('Individual Collection') },
    { id: 2, name: 'Coca Cola', checked: prevBrds.includes('Coca Cola') },
    { id: 3, name: 'Ifad', checked: prevBrds.includes('Ifad') },
    { id: 4, name: 'Kazi Farmas', checked: prevBrds.includes('Kazi Farmas') },
  ]);

  const toggleCheckbox = (id, type) => {
    if (type === 'category') {
      setCategories(categories.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    } else {
      setBrands(brands.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    }
  };

  const handleApply = () => {
    const selectedCats = categories.filter(c => c.checked).map(c => c.name);
    const selectedBrds = brands.filter(b => b.checked).map(b => b.name);

    // QUAN TRỌNG: Quay về đúng màn hình đã gọi Filter
    const destination = route.params?.source || 'DairyEgg';

    navigation.navigate({
      name: destination,
      params: { 
        appliedCategories: selectedCats,
        appliedBrands: selectedBrds,
        // Giữ lại trạng thái checkbox cho lần mở sau
        selectedCategories: selectedCats,
        selectedBrands: selectedBrds
      },
      merge: true, 
    });
  };

  const CheckboxItem = ({ item, type }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleCheckbox(item.id, type)}>
      <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
        {item.checked && <Ionicons name="checkmark" size={18} color="white" />}
      </View>
      <Text style={[styles.checkboxLabel, item.checked && styles.textGreen]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="close" size={28} color="black" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map(item => <CheckboxItem key={item.id} item={item} type="category" />)}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          {brands.map(item => <CheckboxItem key={item.id} item={item} type="brand" />)}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F2' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  scrollContent: { backgroundColor: 'white', marginHorizontal: 15, borderRadius: 30, padding: 25, marginTop: 10 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#181725' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  checkboxChecked: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  textGreen: { color: '#53B175' },
  footer: { padding: 20, backgroundColor: 'white' },
  applyButton: { backgroundColor: '#53B175', borderRadius: 19, height: 67, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: 'white', fontSize: 18, fontWeight: '600' }
});

export default FilterScreen;