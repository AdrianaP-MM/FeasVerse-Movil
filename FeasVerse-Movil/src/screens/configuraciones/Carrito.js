import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/Cards/ProductCard'; // Importa el componente ProductCard

const products = [
    {
        id: 1,
        name: 'Air Jordan 1',
        gender: 'Unisex',
        size: 12,
        color: 'Blanco/Negro',
        price: 370,
        quantity: 1,
        image: 'https://via.placeholder.com/100' // Reemplaza con la URL de la imagen real
    },
    {
        id: 2,
        name: 'Air Jordan 1',
        gender: 'Unisex',
        size: 12,
        color: 'Blanco/Negro',
        price: 370,
        quantity: 1,
        image: 'https://via.placeholder.com/100' // Reemplaza con la URL de la imagen real
    },
    {
        id: 3,
        name: 'Air Jordan 1',
        gender: 'Unisex',
        size: 12,
        color: 'Blanco/Negro',
        price: 370,
        quantity: 1,
        image: 'https://via.placeholder.com/100' // Reemplaza con la URL de la imagen real
    },
    {
        id: 4,
        name: 'Air Jordan 1',
        gender: 'Unisex',
        size: 12,
        color: 'Blanco/Negro',
        price: 370,
        quantity: 1,
        image: 'https://via.placeholder.com/100' // Reemplaza con la URL de la imagen real
    },
];

const Carrito = ({ navigation }) => {
    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="cart" size={32} color="#fff" />
                <Text style={styles.headerText}>Hola, Adri{'\n'}Tu carrito de compras</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} /> // Usa el componente ProductCard
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${total}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    scrollView: {
        margin: 20,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Carrito;
