import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { firestore } from "../helpers/firebaseConfig";
import {
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  collection,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const UpdateMedicalRecordScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isRecordFound, setIsRecordFound] = useState(false);

  const handleSearchRecord = async () => {
    if (!documentNumber.trim()) {
      toast.error("Por favor, proporciona el número de documento.");
      return;
    }
    try {
      const q = query(
        collection(firestore, "medicalRecords"),
        where("documentNumber", "==", documentNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const record = querySnapshot.docs[0].data();
        setFirstName(record.firstName);
        setLastName(record.lastName);
        setEmail(record.email);
        setDocumentType(record.documentType);
        setAddress(record.address);
        setPhoneNumber(record.phoneNumber);
        setDescription(record.description);
        setIsRecordFound(true);
        console.log("Expediente médico encontrado:", record);
        toast.success("Expediente médico encontrado.");
      } else {
        toast.error(
          "No se encontró ningún expediente con ese número de documento."
        );
        setIsRecordFound(false);
      }
    } catch (error) {
      console.error("Error al buscar el expediente médico:", error.message);
      toast.error(
        "Error al buscar el expediente. Por favor, intenta de nuevo."
      );
    }
  };

  const handleUpdateRecord = async () => {
    if (!documentNumber.trim()) {
      toast.error("Por favor, proporciona el número de documento.");
      return;
    }
    try {
      const q = query(
        collection(firestore, "medicalRecords"),
        where("documentNumber", "==", documentNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (record) => {
          const recordRef = doc(firestore, "medicalRecords", record.id);
          await updateDoc(recordRef, {
            firstName,
            lastName,
            email,
            documentType,
            address,
            phoneNumber,
            description,
          });
          console.log("Expediente médico actualizado con éxito:", record.id);
          toast.success("Expediente médico actualizado exitosamente.");
        });
      } else {
        toast.error(
          "No se encontró ningún expediente con ese número de documento."
        );
      }
    } catch (error) {
      console.error("Error al actualizar el expediente médico:", error.message);
      toast.error(
        "Error al actualizar el expediente. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>Actualizar Expediente Médico</Text>
      <TextInput
        placeholder="Número de Documento"
        style={styles.input}
        value={documentNumber}
        onChangeText={setDocumentNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearchRecord}>
        <Text style={styles.buttonText}>Buscar Expediente</Text>
      </TouchableOpacity>

      {isRecordFound && (
        <>
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
          <TouchableOpacity style={styles.button} onPress={handleUpdateRecord}>
            <Text style={styles.buttonText}>Actualizar Expediente</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateMedicalRecordScreen;
