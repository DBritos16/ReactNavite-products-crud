import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { ScaledSheet } from 'react-native-size-matters'

const CreateProduct = ({navigation, route}) => {

  const {recargar} = route.params

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: 0
  });

  const addProduct = async()=>{
    const req = await fetch('http://192.168.0.15:3000/product/create', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(req.ok){
      recargar();
      return navigation.navigate('home');
    };

  };

  return (
    <View style={styles.container}>
        <View>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, name: value})} placeholder="Name"></TextInput>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, description: value})} placeholder="Description"></TextInput>
          <TextInput style={styles.inputStyle} onChangeText={(value)=>setForm({...form, imageURL: value})} placeholder="Image URL"></TextInput>
          <TextInput style={styles.inputStyle} keyboardType='numeric' onChangeText={(value)=>setForm({...form, price: parseInt(value)})} placeholder="Price"></TextInput>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>addProduct()}><Text style={{color: 'white'}}>Crear producto</Text></TouchableOpacity>
          </View>
        </View> 
        {/* <Button title="volver atras" onPress={()=>navigation.navigate('home')}/> */}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: "center",
    margin: '10@s'
  },
  tittle: {
    fontSize: '30@s',
    textAlign: "center",
  },
  inputStyle: {
    backgroundColor: 'white',
    width: '300@s',
    height: '50@s',
    borderRadius: '20@s',
    paddingLeft: '15@s',
    margin: '5@s'
  },
  buttonStyle: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@s',
    color: 'white',
    height: '40@s'
  }
})

export default CreateProduct