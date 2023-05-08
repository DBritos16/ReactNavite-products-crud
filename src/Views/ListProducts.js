
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';

const ListProducts = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    const getProducts = async () => {

        const req = await fetch('http://192.168.216.205:3000/product');
        const res = await req.json();
        setProducts(res);
    }

    const result = filter? products.filter(e=> e.name.includes(filter)) : products

    useEffect(() => {
        getProducts();
    }, []);

    const Item = ({ data }) => (
        <View style={styles.cardContainer}>
            <Image source={{ uri: data.imageURL }} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{data.name}</Text>
                <Text style={styles.cardDescription}>{data.description}</Text>
            </View>
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TextInput style={styles.searchInput} onChangeText={(value)=>setFilter(value)} placeholder='Buscar tarea' />
                <Pressable style={styles.button} onPress={() => navigation.navigate('create')}><Text>Crear Tarea</Text></Pressable>
            </View>
            
            <FlatList data={result} renderItem={({ item }) => <Item data={item}/>} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f6f6f6',
        width: 260,
        height: 45,
        paddingLeft: 10
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#00a000',
        width: 90,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardImage: {
        height: 240,
        resizeMode: 'cover',
        width: '100%',
    },
    cardTextContainer: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 16,
    },
});


export default ListProducts