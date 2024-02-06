import React, { useState } from 'react';
import { BackHandler, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import {  } from './functions/functions';
import { WelcomeScreen } from './screens/welcome/welcome';
import { RegisterScreen } from './screens/register/register';
import styles from './styles/styles';

const App = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showRegisterScreen, setShowRegisterScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showLoginInsideScreen, setShowLoginInsideScreen] = useState(false);
  const [showUsersScreen, setShowUsersScreen] = useState(false);
  const [showUserEditScreen, setShowUserEditScreen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', password: '' });
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null); // Nuevo estado para el índice del usuario seleccionado
  const [editableFields, setEditableFields] = useState({ name: '', password: '' }); // Nuevo estado para campos editables
  const [loggedInUser, setLoggedInUser] = useState(null); // Nuevo estado para el usuario que ha iniciado sesión
  const backgroundImage = require('./img/fondoMar.jpg');

  const handleLogin = () => {
    const user = users.find((user) => user.name === newUser.name && user.password === newUser.password);

    if (user) {
      setLoggedInUser(user);
      setShowLoginScreen(false);
      setShowLoginInsideScreen(true);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  const handleDeleteUser = () => {
    if (selectedUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers.splice(selectedUserIndex, 1);
      setUsers(updatedUsers);
      setShowUserEditScreen(false);
      setShowUsersScreen(true);
    }
  };

  const handleEditUserFields = () => {
    if (selectedUserIndex !== null) {
      const selectedUser = users[selectedUserIndex];
      setEditableFields({ name: selectedUser.name, password: selectedUser.password });
      setShowUserEditScreen(true);
      setShowUsersScreen(false);
    }
  };

  const handleSaveEditFields = () => {
    if (selectedUserIndex !== null) {
      // Validar que el nuevo nombre no esté vacío
      if (editableFields.name.trim() === '') {
        alert('El nombre del usuario no puede estar vacío');
        return;
      }

      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = { ...updatedUsers[selectedUserIndex], ...editableFields };
      setUsers(updatedUsers);
      setShowUserEditScreen(false);
      setShowUsersScreen(true);
    }
  };

  const handleCancelEdit = () => {
    // Puedes realizar alguna limpieza si es necesario
    setShowUserEditScreen(false);
    setShowUsersScreen(true);
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <View style={styles.container}>
        {showWelcomeScreen ? (
          <WelcomeScreen setShowWelcomeScreen={setShowWelcomeScreen}/>
        ) : showRegisterScreen ? (
          <RegisterScreen setShowRegisterScreen={setShowRegisterScreen} setNewUser={setNewUser} setUsers={setUsers}/>
        ) : showLoginScreen ? (
          <View style={styles.buttonContainer}>
            <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>¡Buabua Login!</Text>
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
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowLoginScreen(false)}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
            </TouchableOpacity>
          </View>
        ) : showLoginInsideScreen ? (
          <View>
            <Text>¡Buabua logeo correcto!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowLoginInsideScreen(false)}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
            </TouchableOpacity>
          </View>
        ) : showUsersScreen ? (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
              <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>¡Buabua Usuarios!</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowUsersScreen(false)}
              >
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
              </TouchableOpacity>
              <View>
                <Text style={{ color: 'cyan', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Listado:</Text>
                {users.map((user, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Usuario: {user.name}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setSelectedUserIndex(index);
                        setShowUserEditScreen(true);
                        setShowUsersScreen(false);
                      }}
                    >
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : showUserEditScreen ? (
          <View style={styles.buttonContainer}>
            <Text style={{ color: 'cyan', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Buabua User Edit</Text>
            {selectedUserIndex !== null && (
              <>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Nombre: {users[selectedUserIndex].name}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Contraseña: {users[selectedUserIndex].password}</Text>
                <TextInput
                  value={editableFields.name}
                  onChangeText={(text) => setEditableFields({ ...editableFields, name: text })}
                  placeholder="Nuevo Nombre de Usuario"
                  style={styles.input}
                />
                <TextInput
                  value={editableFields.password}
                  onChangeText={(text) => setEditableFields({ ...editableFields, password: text })}
                  placeholder="Nueva Contraseña"
                  secureTextEntry
                  style={styles.input}
                />
                {/* Botones de acción */}
                <TouchableOpacity onPress={handleSaveEditFields} style={styles.button}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleDeleteUser}
                >
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Borrar Usuario</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} style={styles.button}>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>¡Buabua!</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowRegisterScreen(true)}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowLoginScreen(true)}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowUsersScreen(true)}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Gestionar usuarios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowWelcomeScreen(true)}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default App;