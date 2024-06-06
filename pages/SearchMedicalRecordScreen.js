import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { firestore } from "../helpers/firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";
import styles from "../src/css/RegisterStyle";
import toast, { Toaster } from "react-hot-toast";

const SearchMedicalRecordScreen = ({ navigation }) => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [record, setRecord] = useState(null);

  const handleSearch = async () => {
    if (!documentNumber.trim()) {
      toast.error("Por favor, ingresa un número de documento.");
      return;
    }

    const q = query(
      collection(firestore, "medicalRecords"),
      where("documentNumber", "==", documentNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error(
        "No se encontró ningún expediente con ese número de documento."
      );
      setRecord(null);
      return;
    }

    querySnapshot.forEach((doc) => {
      setRecord(doc.data());
    });

    toast.success("Expediente encontrado.");
  };

  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>Buscar Expediente Médico</Text>
      <TextInput
        placeholder="Número de Documento"
        style={styles.input}
        value={documentNumber}
        onChangeText={setDocumentNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {record && (
        <Card style={styles.searchContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Detalles del Expediente:
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Nombre: {record.firstName} {record.lastName}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Email: {record.email}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Tipo de Documento: {record.documentType}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Número de Documento: {record.documentNumber}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Dirección: {record.address}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Teléfono: {record.phoneNumber}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Descripción: {record.description}
          </Text>
        </Card>
      )}
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchMedicalRecordScreen;
