import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';

const OrderProductCard = ({ product, onEdit, onDelete }) => {
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
});

export default OrderProductCard;
