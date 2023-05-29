import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Products Shop</Text>
            <Pressable onPress={() => navigation.navigate('home')} style={styles.button}><Text style={{color: 'white', fontSize: 20}}>Entrar</Text></Pressable>
        </View>
    )
}

const styles = ScaledSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e0c42'
    },
    tittle: {
        color: 'white', 
        fontSize: '40@s',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#079ea6',
        height: '50@s',
        width: '100@s',
        borderRadius: '20@s'
    }
})

export default Start