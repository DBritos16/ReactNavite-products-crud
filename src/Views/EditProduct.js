import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


const CreateProduct = ({navigation, route}) => {

  const { productID } = route.params;

  const [form, setForm] = useState({
    name: '',
    description: '',
    imageURL: '',
    price: ''
  });

  const getProductInfo = async()=>{
    const req = await fetch('http://192.168.216.59:3000/product/'+productID);

    const res = await req.json();

    if(req.ok){
      setForm(res);
    }
  };

  const updateProduct = async()=>{
    const req = await fetch('http://192.168.216.59:3000/product/update/'+productID, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(req.ok){
      return navigation.navigate('home');
    };

  };

  useEffect(()=>{
    getProductInfo();
  },[])

  return (
    <View style={styles.container}>
        <Text style={styles.tittle}>Editar {form.name}</Text>
        <View>
          <TextInput style={styles.inputStyle} value={form.name} onChangeText={(value)=>setForm({...form, name: value})} placeholder="Name"></TextInput>
          <TextInput style={styles.inputStyle} value={form.description} onChangeText={(value)=>setForm({...form, description: value})} placeholder="Description"></TextInput>
          <TextInput style={styles.inputStyle} value={form.imageURL} onChangeText={(value)=>setForm({...form, imageURL: value})} placeholder="Image URL"></TextInput>
          <TextInput style={styles.inputStyle} keyboardType='numeric' value={form.price.toString()} onChangeText={(value)=>setForm({...form, price: value})} placeholder="Price"></TextInput>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>updateProduct()}><Text style={{color: 'white'}}>Actualizar producto</Text></TouchableOpacity>
          </View>
        </View> 
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