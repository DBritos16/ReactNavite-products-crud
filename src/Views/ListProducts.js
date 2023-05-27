
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StatusBar, Text, TextInput, View, Modal, TouchableOpacity, Animated } from 'react-native';
import { FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters'
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';


const ListProducts = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0]; 
    const fadeAnim2 = useState(new Animated.Value(1))[0]; 
    const [filter, setFilter] = useState('');
    const [id, setId] = useState('');

    const getProducts = async () => {

        const req = await fetch('http://192.168.0.15:3000/product');
        const res = await req.json();
        setProducts(res);
        //alert('Cargado');
    }

    const result = filter? products.filter(e=> e.name.includes(filter)) : products


    const deleteProduct = async()=>{

      const req = await fetch(`http://192.168.0.15:3000/product/delete/${id}`, {
        method: 'DELETE'
      });

      if(req.ok){
        getProducts()
        setModalDeleteVisible(false);
        setShowOptions(false);
        return alert('Eliminado con exito');
      }

    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(()=>{
      console.log(showOptions)
    },[showOptions])

    const Card = ({ data }) => {
        return (
          <TouchableOpacity onLongPress={()=>{setShowOptions(!showOptions), setId(data._id)}} style={{...styles.Cardcontainer, opacity: (showOptions&&id===data._id)?0.7: 1}}>
              <View style={styles.imageContainer}>
                <Image source={{uri: data.imageURL}} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.subtitle}>{data.description}</Text>
                <Text>${data.price} USD</Text>
              </View>
          </TouchableOpacity>
        );
      };


      useEffect(() => {
        if (showOptions) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      }, [showOptions]);

    return (
        <View style={styles.background}>
            <StatusBar backgroundColor={'#1e0c42'}/>
            <View style={styles.header}>

              <Animated.View style={{opacity: fadeAnim2, display: showOptions?'none':'flex'}}>
                <View style={{...styles.headerContainer, display: showOptions?'none':'flex'}}>
                  <TextInput style={styles.searchInput} onChangeText={(value)=>setFilter(value)} placeholder='Buscar tarea' />
                  <Pressable style={styles.button} onPress={() => navigation.navigate('create', {recargar: getProducts})}><AntDesign name="addfile" size={24} color="white" /></Pressable>
                  {/* <Pressable style={styles.button} onPress={() => getProducts()}><Ionicons name="reload" size={24} color="white" /></Pressable> */}
                </View>


              </Animated.View>
              <Animated.View style={{opacity: fadeAnim, display: !showOptions?'none':'flex'}}>
                  <View style={styles.buttonArea}>
                      <Pressable onPress={()=>setShowOptions(!showOptions)}><Ionicons name='arrow-back' size={30} color={'white'}/></Pressable>
                      <View style={{flexDirection: 'row'}}>
                        <Pressable onPress={()=>navigation.navigate('edit', {productID: id})}><Feather name="edit-3" size={30} color="white" /></Pressable>
                        <Pressable onPress={()=>{setModalDeleteVisible(true)}}><MaterialCommunityIcons name="delete-outline" size={30} color="white"/></Pressable>
                      </View>
                  </View>
              </Animated.View>
            </View>

            
            <View style={styles.container}>
                <FlatList data={result} renderItem={({ item }) => <Card data={item}/>} />

                <Modal visible={modalDeleteVisible} animationType='slide' transparent={true} onRequestClose={()=>setModalDeleteVisible(false)}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={{fontSize: 20}}>¿Estas seguro que quieres eliminar este articulo?</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <TouchableOpacity style={{...styles.buttonModal, backgroundColor: 'red'}} onPress={()=>setModalDeleteVisible(false)}><Text style={{color: 'white'}}>No</Text></TouchableOpacity>
                          <TouchableOpacity style={{...styles.buttonModal, backgroundColor: 'green'}} onPress={()=>deleteProduct()}><Text style={{color: 'white'}}>Si</Text></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>


                <Modal visible={modalCreateVisible} animationType='slide' transparent={true} onRequestClose={()=>setModalCreateVisible(false)}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                     
                    </View>
                  </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#079ea6'
    },
    container: {
        marginTop: '5@s',
        marginBottom: '66@s'
    },
    header: {
        backgroundColor: '#1e0c42',
        height: '60@s',
        paddingTop: '12@s',
    },
    headerContainer:{
      flexDirection: 'row',
      justifyContent: 'center'
    },
    searchInput: {
        borderColor: 'black',
        borderWidth: '1@s',
        borderRadius: '20@s',
        backgroundColor: '#f6f6f6',
        width: '280@s',
        height: '35@s',
        paddingLeft: '10@s',
        marginRight: '10@s'
    },
    button: {
        borderRadius: '20@s',
        backgroundColor: '#079ea6',
        width: '35@s',
        height: '35@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Cardcontainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '8@s',
        elevation: '2@s',
        margin: '8@s',
      },
      imageContainer: {
        width: '50%',
      },
      image: {
        width: '100%',
        height: '150@s',
        resizeMode: 'cover',
        borderTopLeftRadius: '8@s',
        borderBottomLeftRadius: '8@s',
      },
      textContainer: {
        width: '50%',
        padding: '16@s'
      },
      title: {
        fontSize: '18@s',
        fontWeight: 'bold',
        marginBottom: '8@s',
      },
      subtitle: {
        fontSize: '15@s',
        color: '#white',
        marginBottom: '3@s'
      },
      buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '6@s'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '22@s',
      },
      modalView: {
        margin: '20@s',
        backgroundColor: 'white',
        borderRadius: '20@s',
        padding: '35@s',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: '2@s',
        },
        shadowOpacity: '0.25@s',
        shadowRadius: '4@s',
        elevation: '5@s',
      },
      buttonModal: {
        height: '25@s',
        width: '50@s',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: '20@s', 
        margin: '5@s'
      }
});


export default ListProducts