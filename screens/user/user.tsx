import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

const UserScreen = () => {
    const navegador = useNavigation();
    const [loginUser, setLoginUser] = useState({ name: '', password: '' });
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const backgroundImage = require('../../img/fondoMar.jpg');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('User');
            setLoggedInUserName(user || '');
            const password = await AsyncStorage.getItem('Password');
            setLoginUser({ name: user || '', password: password || '' });
        };

        fetchUser();
    }, []);

    const handlePasswordChange = async () => {
        try {
            // Verificar la contraseña actual antes de cambiarla
            const storedPassword = await AsyncStorage.getItem(`Password_${loggedInUserName}`);
            
            if (loginUser.password === storedPassword) {
                // Actualizar la contraseña en el almacenamiento local
                await AsyncStorage.setItem(`Password_${loggedInUserName}`, newPassword);
    
                // Actualizar el estado local con la nueva contraseña
                setLoginUser({ ...loginUser, password: newPassword });
    
                // Limpiar el campo de nueva contraseña
                setNewPassword('');
    
                // Informar al usuario que la contraseña se ha cambiado con éxito
                Alert.alert('Contraseña cambiada con éxito');
            } else {
                // Contraseña actual incorrecta
                Alert.alert('La contraseña actual es incorrecta.');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}> Buabua user</Text>
                <Text style={{ color: 'cyan', fontSize: 14, fontWeight: 'normal', marginTop: 50 }}>Bienvenido {loggedInUserName}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña actual"
                    value={loginUser.password}
                    onChangeText={(text) => setLoginUser({ ...loginUser, password: text })}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Cambiar contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Select" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default UserScreen;
