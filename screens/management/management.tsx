import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

const ManagementScreen = () => {
    const backgroundImage = require('../../img/fondoMar.jpg');
    const navegador = useNavigation();
    const [userList, setUserList] = useState<{ username: string; password: string }[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userListString = await AsyncStorage.getItem('UserList');
                let userList = [];
    
                if (userListString) {
                    // Verificar si la cadena representa un array y convertirla si es necesario
                    userList = JSON.parse(userListString);
                    if (!Array.isArray(userList)) {
                        userList = [userList];
                    }
                }
    
                // Obtener las contraseñas para cada usuario
                const usersWithPasswords = await Promise.all(
                    userList.map(async (username) => {
                        const password = await AsyncStorage.getItem(`Password_${username}`);
                        return { username, password: password || '' };
                    })
                );
    
                // Filtrar los usuarios válidos
                const validUsers = usersWithPasswords.filter((user) => typeof user.username === 'string' && user.username.trim() !== '');
    
                // Actualizar el estado solo si hay usuarios válidos
                if (validUsers.length > 0) {
                    setUserList(validUsers);
                }
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };
    
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userName: string) => {
        try {
            // Eliminar el usuario de la lista
            const updatedUserList = userList.filter((user) => user.username !== userName);
            await AsyncStorage.setItem('UserList', JSON.stringify(updatedUserList));

            // Eliminar los datos del usuario
            await AsyncStorage.removeItem(`User_${userName}`);
            await AsyncStorage.removeItem(`Password_${userName}`);

            // Actualizar la lista de usuarios en estado
            setUserList(updatedUserList);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>Buabua gestión</Text>

                <FlatList
                    data={userList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 30, marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'left', fontWeight: 'normal' }}>{item.username}</Text>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'left', fontWeight: 'normal' }}>{item.password}</Text>
                            <TouchableOpacity onPress={() => handleDeleteUser(item.username)}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navegador.navigate("Select" as never)}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navegador.navigate("Select" as never)}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default ManagementScreen;





/*import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

const ManagementScreen = () => {
    const backgroundImage = require('../../img/fondoMar.jpg');
    const navegador = useNavigation();
    const [userList, setUserList] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userListString = await AsyncStorage.getItem('UserList');
                let userList = [];
        
                if (userListString) {
                    // Verificar si la cadena representa un array y convertirla si es necesario
                    userList = JSON.parse(userListString);
                    if (!Array.isArray(userList)) {
                        userList = [userList];
                    }
                }
        
                setUserList(userList.filter((username) => typeof username === 'string' && username.trim() !== ''));
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };
        

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userName: string) => {
        try {
            // Eliminar el usuario de la lista
            const updatedUserList = userList.filter(user => user !== userName);
            await AsyncStorage.setItem('UserList', JSON.stringify(updatedUserList));

            // Eliminar los datos del usuario
            await AsyncStorage.removeItem(`User_${userName}`);
            await AsyncStorage.removeItem(`Password_${userName}`);

            // Actualizar la lista de usuarios en estado
            setUserList(updatedUserList);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>Buabua gestión</Text>

                <FlatList
                    data={userList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 30, marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'left', fontWeight: 'normal' }}>{item}</Text>
                            <TouchableOpacity onPress={() => handleDeleteUser(item)}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navegador.navigate("Select" as never)}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navegador.navigate("Select" as never)}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default ManagementScreen;*/
