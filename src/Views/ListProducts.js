
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ListProducts = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    const getProducts = async () => {

        const req = await fetch('http://192.168.216.59:3000/product');
        const res = await req.json();
        setProducts(res);
        //alert('Cargado');
    }

    const result = filter? products.filter(e=> e.name.includes(filter)) : products

    useEffect(() => {
        getProducts();
        console.log('dasdasd')
    }, []);

    const Card = ({ data }) => {
        return (
          <View style={styles.Cardcontainer}>
            <View style={styles.imageContainer}>
              <Image source={{uri: data.imageURL}} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.subtitle}>{data.description}</Text>
              <Text>${data.price} USD</Text>
              <View style={styles.buttonArea}>
                    <Pressable onPress={()=>navigation.navigate('edit', {productID: data._id})}><Feather name="edit-3" size={19} color="black" /></Pressable>
                    <Pressable><MaterialCommunityIcons name="delete-outline" size={19} color="black" /></Pressable>
              </View>
            </View>
          </View>
        );
      };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TextInput style={styles.searchInput} onChangeText={(value)=>setFilter(value)} placeholder='Buscar tarea' />
                <Pressable style={styles.button} onPress={() => navigation.navigate('create')}><AntDesign name="addfile" size={24} color="white" /></Pressable>
                <Pressable style={styles.button} onPress={() => getProducts()}><Ionicons name="reload" size={24} color="white" /></Pressable>
            </View>
            <View >
                <FlatList data={result} renderItem={({ item }) => <Card data={item}/>} />
            </View>
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
        justifyContent: 'space-between',
        marginBottom: 10
    },
    searchInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f6f6f6',
        width: 270,
        height: 40,
        paddingLeft: 10
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#00a000',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Cardcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        margin: 8,
      },
      imageContainer: {
        width: '50%',
      },
      image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      textContainer: {
        width: '50%',
        padding: 16
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 3
      },
      buttonArea: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'relative',
        bottom: -18
      }
});


export default ListProducts