import { BackHandler, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';

const WelcomeScreen = () => {
    const backgroundImage = require('../../img/fondoMar.jpg');
    const navegador = useNavigation();
    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <View>
                <Text style={{ color: 'cyan', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 50 }}>Bienvenido a Buabua</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navegador.navigate("Select" as never)}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Salir de la aplicación</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default WelcomeScreen;