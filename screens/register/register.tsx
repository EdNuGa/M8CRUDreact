import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

async function userExist(newUserName: string) {
    try {
        const userListString = await AsyncStorage.getItem('UserList');
        if (userListString) {
            const userList = JSON.parse(userListString);
            return userList.includes(newUserName);
        }
    } catch (error) {
        console.error('Error al verificar la existencia del usuario:', error);
        return false;
    }
    return false;
}

const RegisterScreen = () => {
    const navegador = useNavigation();
    const backgroundImage = require('../../img/fondoMar.jpg');
    const [newUser, setNewUser] = useState({ name: '', password: '' });

    const handleRegister = async () => {
        const newUserName = newUser.name.trim();
    
        try {
            const userExists = await userExist(newUserName);
    
            if (userExists) {
                Alert.alert("El usuario ya existe.");
            } else {
                // Agregar el nuevo usuario a la lista
                const userListString = await AsyncStorage.getItem('UserList');
                const userList = userListString ? JSON.parse(userListString) : [];
                userList.push(newUserName);
    
                // Guardar la lista actualizada
                await AsyncStorage.setItem('UserList', JSON.stringify(userList));
    
                // Guardar los datos del nuevo usuario
                await AsyncStorage.setItem(`User_${newUserName}`, newUserName);
                await AsyncStorage.setItem(`Password_${newUserName}`, newUser.password);
    
                // Datos del usuario guardados con éxito
                Alert.alert("Usuario creado con éxito.");
                navegador.navigate('Select' as never);
            }
        } catch (error) {
            console.error('Error al guardar los datos del usuario:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 50 }}> Buabua registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={newUser.name}
                    onChangeText={(text) => setNewUser({ ...newUser, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={newUser.password}
                    onChangeText={(text) => setNewUser({ ...newUser, password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Select" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default RegisterScreen;


/*import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/styles';
import { useState } from 'react';

const addUser = () => {
    if (newUser.name.trim() === '' || newUser.password.trim() === '') {
        return;
    }

    const userExists = users.some((user) => user.name === newUser.name);
    if (userExists) {
        alert('El usuario ya existe');
        return;
    }

    setUsers(prevUsers => [...prevUsers, newUser]);
    setNewUser({ name: '', password: '' });
};

export function RegisterScreen  () {
    return (
        <View style={styles.buttonContainer}>
            <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>¡Buabua Register!</Text>
            <View style={styles.buttonContainer}>
                <TextInput
                    value={newUser.name}
                    onChangeText={(text) => setNewUser({ ...newUser, name: text })}
                    placeholder="Nombre de usuario"
                    style={styles.input}
                />
                <TextInput
                    value={newUser.password}
                    onChangeText={(text) => setNewUser({ ...newUser, password: text })}
                    placeholder="Contraseña"
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity onPress={addUser} style={styles.button}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Guardar Usuario</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowRegisterScreen(false)}
            >
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};*/