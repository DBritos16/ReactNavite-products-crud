
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ListProducts = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [filter, setFilter] = useState('');
    const [id, setId] = useState('');

    const getProducts = async () => {

        const req = await fetch('http://192.168.216.229:3000/product');
        const res = await req.json();
        setProducts(res);
        //alert('Cargado');
    }

    const result = filter? products.filter(e=> e.name.includes(filter)) : products


    const deleteProduct = async()=>{

      const req = await fetch(`http://192.168.216.229:3000/product/delete/${id}`, {
        method: 'DELETE'
      });

      console.log(id)

      if(req.ok){
        getProducts()
        setModalVisible(false);
        return alert('Eliminado con exito');
      }

    }

    useEffect(() => {
        getProducts();
        
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
                    <Pressable><MaterialCommunityIcons name="delete-outline" size={19} color="black" onPress={()=>{setModalVisible(true), setId(data._id)}}/></Pressable>
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

                <Modal visible={modalVisible} animationType='slide' transparent={true} onRequestClose={()=>setModalVisible(false)}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={{fontSize: 20}}>¿Estas seguro que quieres eliminar este articulo?</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <TouchableOpacity style={{backgroundColor: 'red', height: 25, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 20, margin: 5}} onPress={()=>setModalVisible(false)}><Text>No</Text></TouchableOpacity>
                          <TouchableOpacity style={{backgroundColor: 'green', height: 25, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 20, margin: 5}} onPress={()=>deleteProduct()}><Text>Si</Text></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
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
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});


export default ListProducts