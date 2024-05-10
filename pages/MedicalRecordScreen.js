import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { firestore } from "../helpers/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";


const MedicalRecordScreen = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const handleCreateRecord = async () => {
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !documentType.trim() ||
            !documentNumber.trim() ||
            !address.trim() ||
            !phoneNumber.trim()
        ) {
            toast.error("Por favor, completa todos los campos.");
            return;
        }
        try {
            const newRecordRef = doc(collection(firestore, "medicalRecords"));
            await setDoc(newRecordRef, {
                firstName,
                lastName,
                email,
                documentType,
                documentNumber,
                address,
                phoneNumber,
            });
            console.log("Expediente m�dico creado con �xito:", newRecordRef.id);
            toast.success("Expediente m�dico creado exitosamente.");
        } catch (error) {
            console.error("Error al crear el expediente m�dico:", error.message);
            toast.error("Error al crear el expediente. Por favor, intenta de nuevo.");
        }
    };
    return (
        <View style={styles.container}>
            <Toaster />
            <Text style={styles.title}>Crear Expediente M�dico</Text>
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
                placeholder="Correo Electr�nico"
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
                placeholder="N�mero de Documento"
                style={styles.input}
                value={documentNumber}
                onChangeText={setDocumentNumber}
            />
            <TextInput
                placeholder="Direcci�n"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                placeholder="N�mero de Tel�fono"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
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