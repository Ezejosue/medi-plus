import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../src/styles/LoginStyles';
import { Link } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signInWithGoogleAsync = async () => {
        const config = {
            iosClientId: `YOUR_IOS_CLIENT_ID`,
            androidClientId: `YOUR_ANDROID_CLIENT_ID`,
            scopes: ['profile', 'email']
        };

        try {
            const result = await Google.logInAsync(config);
            if (result.type === 'success') {
                // Log in was successful
                onSignIn(result);
            } else {
                console.log("Cancelled");
            }
        } catch (e) {
            console.log("Error with Google Log In", e);
        }
    };

    const onSignIn = (googleUser) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken);
        firebase.auth().signInWithCredential(credential).catch((error) => {
            console.log("Firebase auth error", error);
        });
    };

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

            <TouchableOpacity onPress={signInWithGoogleAsync} style={styles.buttonGoogle}>
                <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} />
                <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
            </TouchableOpacity>

            <Link to={""} style={styles.register}>¿No tienes cuenta?</Link>
        </View>
    );
};

export default LoginScreen;
