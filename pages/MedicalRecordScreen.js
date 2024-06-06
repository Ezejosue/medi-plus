import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { firestore } from "../helpers/firebaseConfig";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const MedicalRecordScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateRecord = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !documentType.trim() ||
      !documentNumber.trim() ||
      !address.trim() ||
      !phoneNumber.trim() ||
      !description.trim()
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    try {
      // Verificar si el documentNumber ya existe
      const q = query(
        collection(firestore, "medicalRecords"),
        where("documentNumber", "==", documentNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error(
          "El número de documento ya está en uso. Por favor, intenta con otro."
        );
        return;
      }
      const newRecordRef = doc(collection(firestore, "medicalRecords"));
      await setDoc(newRecordRef, {
        firstName,
        lastName,
        email,
        documentType,
        documentNumber,
        address,
        phoneNumber,
        description,
      });
      console.log("Expediente médico creado con éxito:", newRecordRef.id);
      toast.success("Expediente médico creado exitosamente.");
    } catch (error) {
      console.error("Error al crear el expediente médico:", error.message);
      toast.error("Error al crear el expediente. Por favor, intenta de nuevo.");
    }
  };
  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>Crear Expediente Médico</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Apellidos"
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
      <Picker
        selectedValue={documentType}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setDocumentType(itemValue)}
      >
        <Picker.Item label="Seleccione un tipo de documento" value="" />
        <Picker.Item label="DUI" value="DUI" />
        <Picker.Item label="Pasaporte" value="Pasaporte" />
      </Picker>
      <TextInput
        placeholder="Número de Documento"
        style={styles.input}
        value={documentNumber}
        onChangeText={setDocumentNumber}
      />
      <TextInput
        placeholder="Dirección"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Número de Teléfono"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateRecord}>
        <Text style={styles.buttonText}>Crear Expediente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalRecordScreen;
