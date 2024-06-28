import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: `${Config.IP}/FeasVerse/api/helpers/images/zapatos/${product.image}` }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productGender}>{product.gender}</Text>
                <Text>Talla: {product.size}</Text>
                <Text>Color: {product.color}</Text>
                <Text>Cantidad: {product.quantity}</Text>
                <Text style={styles.unitPrice}>Precio unitario del zapato: ${product.price}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
                    <Ionicons name="pencil" size={24} color="#007BFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.trashIcon} onPress={onDelete}>
                    <Ionicons name="trash" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>${product.price * product.quantity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productGender: {
        fontSize: 16,
        marginBottom: 5,
    },
    unitPrice: {
        marginTop: 10,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    editIcon: {
        marginRight: 10,
    },
    trashIcon: {},
});

export default ProductCard;
