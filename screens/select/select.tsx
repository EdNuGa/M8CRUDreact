import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from '../../styles/styles';

const SelectScreen = () => {
    const backgroundImage = require('../../img/fondoMar.jpg');
    const navegador = useNavigation();

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 50 }}>¡Buabua!</Text>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Register" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Login" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navegador.navigate("Management" as never)}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Gestionar usuarios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navegador.navigate("Welcome" as never)}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default SelectScreen;
