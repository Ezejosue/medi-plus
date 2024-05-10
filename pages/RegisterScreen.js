import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { auth, firestore } from "../helpers/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleRegister = async () => {
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
        documentType,
        documentNumber,
        specialty,
      });
      console.log("Usuario registrado con éxito:", user.uid);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
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
    </View>
  );
};

export default RegisterScreen;
