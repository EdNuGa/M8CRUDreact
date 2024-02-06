import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

async function userExist(newUser: string) {
    let user = await AsyncStorage.getItem('User');

    if (user == newUser) {
        return true
    } else {
        return false
    }

}

const LoginScreen = () => {
    const navegador = useNavigation();
    const [loginUser, setLoginUser] = useState({ name: '', password: '' });
    const backgroundImage = require('../../img/fondoMar.jpg');

    const userExists = async (userName: string) => {
        try {
            const userListString = await AsyncStorage.getItem('UserList');
            
            if (!userListString) {
                return false; // No hay usuarios registrados
            }
    
            const userList = JSON.parse(userListString);
            return userList.includes(userName);
        } catch (error) {
            console.error('Error al verificar la existencia del usuario:', error);
            return false;
        }
    };
    
    const handleLogin = async () => {
        const { name, password } = loginUser;
    
        try {
            const userExistsResult = await userExists(name);
    
            if (userExistsResult) {
                const storedPassword = await AsyncStorage.getItem(`Password_${name}`);
                
                if (password === storedPassword) {
                    // Usuario autenticado con éxito
                    Alert.alert('Inicio de sesión exitoso');
                    navegador.navigate('User' as never);
                } else {
                    Alert.alert('La contraseña es incorrecta.');
                }
            } else {
                Alert.alert('El usuario no existe.');
            }
        } catch (error) {
            console.error('Error al realizar el inicio de sesión:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 50 }}> Buabua login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={loginUser.name}
                    onChangeText={(text) => setLoginUser({ ...loginUser, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={loginUser.password}
                    onChangeText={(text) => setLoginUser({ ...loginUser, password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Select" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;