import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { firestore } from "../helpers/firebaseConfig";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import styles from "../src/css/AppointmentStyle";
import toast, { Toaster } from "react-hot-toast";

const ViewAppointmentsScreen = ({ route, navigation }) => {
  const { doctorDocumentNumber, doctorEmail } = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorIdentifier = doctorDocumentNumber
          ? doctorDocumentNumber
          : doctorEmail;
        const q = query(
          collection(firestore, "appointments"),
          where(
            doctorDocumentNumber ? "doctorDocumentNumber" : "doctorEmail",
            "==",
            doctorIdentifier
          )
        );
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = [];

        for (const doc of querySnapshot.docs) {
          const appointmentData = doc.data();
          const patientQuery = query(
            collection(firestore, "medicalRecords"),
            where("documentNumber", "==", appointmentData.patientDocumentNumber)
          );
          const patientSnapshot = await getDocs(patientQuery);

          let patientInfo = { firstName: "Desconocido", lastName: "" };
          if (!patientSnapshot.empty) {
            const patientData = patientSnapshot.docs[0].data();
            patientInfo = {
              firstName: patientData.firstName,
              lastName: patientData.lastName,
            };
          }

          fetchedAppointments.push({
            id: doc.id,
            ...appointmentData,
            patientName: `${patientInfo.firstName} ${patientInfo.lastName}`,
          });
        }

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
        toast.error("Error al cargar las citas.");
      }
    };

    fetchAppointments();
  }, [doctorDocumentNumber, doctorEmail]);

  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>Mis Citas</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointmentsText}>
          No tienes citas agendadas.
        </Text>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} style={styles.searchContainer}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Detalles de la Cita:
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Paciente: {appointment.patientName} (
              {appointment.patientDocumentNumber})
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Fecha:{" "}
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Hora: {appointment.appointmentTime}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Descripción: {appointment.description}
            </Text>
          </Card>
        ))
      )}
      <Pressable
        style={styles.buttonBack}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </Pressable>
    </View>
  );
};

export default ViewAppointmentsScreen;
