import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../src/styles/LoginStyles';
import { Link } from '@react-navigation/native';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="******"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Link to={""} style={styles.forgotPassword}>Olvidaste tu clave</Link>

            <TouchableOpacity onPress={() => onLogin(username, password)} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <Link to={""} style={styles.register}>¿No tienes cuenta?</Link>
        </View>
    );
};

export default LoginScreen;
