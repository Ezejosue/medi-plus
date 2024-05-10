import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../src/css/LoginStyle";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../helpers/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ onLogin, navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "777621078223-nufdiaga1t2ccoljbb90bc16kv5e0vqf.apps.googleusercontent.com",
    webClientId:
      "777621078223-eo2slltgbtajjl78fi9ln1j3t6q9fc31.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userInfo = await response.json();
      const normalizedUser = {
        name: userInfo.name,
        email: userInfo.email,
        uid: userInfo.id,
      };
      onLogin(normalizedUser);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Por favor, ingresa tu usuario y contraseña.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;
      const normalizedUser = {
        name: user.email,
        email: user.email,
        uid: user.uid,
      };
      onLogin(normalizedUser);
      toast.success("Inicio de sesión exitoso");
      navigation.navigate("Home");
      console.log("Inicio de sesión exitoso:", user.uid);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error(
          "Usuario o contraseña incorrectos. Por favor, verifica tus datos."
        );
      } else {
        toast.error(
          "Error en el inicio de sesión. Por favor, intenta de nuevo."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Toaster />
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={styles.logo}
      />
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
        type="password"
        onChangeText={setPassword}
        autoComplete="password"
        textContentType="password"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => promptAsync()}
        style={styles.buttonGoogle}
      >
        <Image
          source={require("../assets/google-icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonGoogleText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.register}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.register}>¿No tienes cuenta?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
