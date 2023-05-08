import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


const CreateProduct = ({navigation}) => {

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: 0
  });

  const addProduct = async()=>{
    const req = await fetch('http://192.168.216.205:3000/product/create', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(req.ok){
      return navigation.navigate('home');
    };

  };

  return (
    <View style={styles.container}>
        <Text style={styles.tittle}>Crear un nuevo producto</Text>
        <View>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, name: value})} placeholder="Name"></TextInput>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, description: value})} placeholder="Description"></TextInput>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, imageURL: value})} placeholder="Image URL"></TextInput>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, price: parseInt(value)})} placeholder="Price"></TextInput>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>addProduct()}><Text style={{color: 'white'}} onPress={()=>addProduct()}>Crear tarea</Text></TouchableOpacity>
          </View>
        </View> 
        {/* <Button title="volver atras" onPress={()=>navigation.navigate('home')}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: "center",
    margin: 10
  },
  tittle: {
    fontSize: 30,
    textAlign: "center",
  },
  inputStyle: {
    backgroundColor: 'white',
    width: 300,
    height: 50,
    borderRadius: 20,
    paddingLeft: 15,
    margin: 5
  },
  buttonStyle: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    color: 'white',
    height: 40
  }
})

export default CreateProduct