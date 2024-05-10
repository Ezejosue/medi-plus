import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { auth, firestore } from "../helpers/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleRegister = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !documentType.trim() ||
      !documentNumber.trim() ||
      !specialty.trim()
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, {
        firstName,
        lastName,
        email,
        documentType,
        documentNumber,
        specialty,
      });
      console.log("Usuario registrado con éxito:", user.uid);
      toast.success("Registro exitoso. ¡Bienvenido!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "El correo electrónico ya está en uso. Por favor, intenta con otro."
        );
      } else {
        toast.error("Error en el registro. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>¡Regístrate!</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        type="password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
        textContentType="password"
      />
      <Picker
        selectedValue={documentType}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setDocumentType(itemValue)}
      >
        <Picker.Item label="Select an option" value="" />
        <Picker.Item label="DUI" value="DUI" />
        <Picker.Item label="Pasaporte" value="Pasaporte" />
      </Picker>
      <TextInput
        placeholder="Número de Documento"
        style={styles.input}
        value={documentNumber}
        onChangeText={setDocumentNumber}
      />
      <Picker
        selectedValue={specialty}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSpecialty(itemValue)}
      >
        <Picker.Item label="Select an option" value="" />
        <Picker.Item label="Medicina General" value="Medicina General" />
        <Picker.Item label="Pediatría" value="Pediatría" />
        <Picker.Item label="Cardiología" value="Cardiología" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.register}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.register}>¿Ya tienes cuenta?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
