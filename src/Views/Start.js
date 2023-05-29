import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/8978931.png')} style={styles.logo} />
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
    logo: {
        width: '350@s',
        height: '350@s',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#079ea6',
        height: '50@s',
        width: '100@s',
        borderRadius: '20@s',
        bottom: '70@s'
    }
})

export default Start