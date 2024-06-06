import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Picker } from "@react-native-picker/picker";
import styles from "../src/css/RegisterStyle";
import { firestore } from "../helpers/firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const ScheduleAppointmentScreen = ({ route, navigation }) => {
  const { doctorDocumentNumber, doctorEmail } = route.params;
  const [patientDocumentNumber, setPatientDocumentNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [description, setDescription] = useState("");
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
        querySnapshot.forEach((doc) => {
          fetchedAppointments.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
        toast.error("Error al cargar las citas.");
      }
    };

    fetchAppointments();
  }, [doctorDocumentNumber, doctorEmail]);

  const handleScheduleAppointment = async () => {
    if (
      !patientDocumentNumber.trim() ||
      !appointmentDate ||
      !appointmentTime.trim() ||
      !description.trim()
    ) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const now = new Date();
    const appointmentDateTime = new Date(appointmentDate);
    const [hours, minutes] = appointmentTime.split(":").map(Number);
    appointmentDateTime.setHours(hours);
    appointmentDateTime.setMinutes(minutes);

    if (appointmentDateTime < now) {
      toast.error("No se puede agendar una cita para una fecha y hora pasada.");
      return;
    }

    // Verificar si el número de documento del paciente existe en medicalRecords
    const patientQuery = query(
      collection(firestore, "medicalRecords"),
      where("documentNumber", "==", patientDocumentNumber)
    );
    const patientSnapshot = await getDocs(patientQuery);

    if (patientSnapshot.empty) {
      toast.error(
        "No se encontró ningún paciente con ese número de documento."
      );
      return;
    }

    // Verificar si ya hay una cita en la misma fecha y hora
    const conflictingAppointment = appointments.find(
      (appointment) =>
        new Date(appointment.appointmentDate).getTime() ===
        appointmentDateTime.getTime()
    );

    if (conflictingAppointment) {
      toast.error(
        "Ya existe una cita agendada en este horario. Por favor, elige otro horario."
      );
      return;
    }

    try {
      const newAppointmentRef = doc(collection(firestore, "appointments"));
      const appointmentData = {
        patientDocumentNumber,
        appointmentDate: appointmentDateTime.toISOString(),
        appointmentTime,
        description,
      };
      if (doctorDocumentNumber) {
        appointmentData.doctorDocumentNumber = doctorDocumentNumber;
      } else {
        appointmentData.doctorEmail = doctorEmail;
      }

      await setDoc(newAppointmentRef, appointmentData);
      console.log("Cita agendada con éxito:", newAppointmentRef.id);
      toast.success("Cita agendada exitosamente.");
    } catch (error) {
      console.error("Error al agendar la cita:", error.message);
      toast.error("Error al agendar la cita. Por favor, intenta de nuevo.");
    }
  };
  return (
    <View style={styles.container}>
      <Toaster />
      <Text style={styles.title}>Agendar Cita</Text>
      <TextInput
        placeholder="Número de Documento del Paciente"
        style={styles.input}
        value={patientDocumentNumber}
        onChangeText={setPatientDocumentNumber}
      />
      <DatePicker
        selected={appointmentDate}
        onChange={(date) => setAppointmentDate(date)}
        dateFormat="yyyy-MM-dd"
        className="date-picker"
        minDate={new Date()}
      />
      <Picker
        selectedValue={appointmentTime}
        style={styles.input}
        onValueChange={(itemValue) => setAppointmentTime(itemValue)}
      >
        <Picker.Item label="Selecciona una hora" value="" />
        <Picker.Item label="09:00" value="09:00" />
        <Picker.Item label="09:30" value="09:30" />
        <Picker.Item label="10:00" value="10:00" />
        <Picker.Item label="10:30" value="10:30" />
        <Picker.Item label="11:00" value="11:00" />
        <Picker.Item label="11:30" value="11:30" />
        <Picker.Item label="12:00" value="12:00" />
        <Picker.Item label="12:30" value="12:30" />
        <Picker.Item label="13:00" value="13:00" />
        <Picker.Item label="13:30" value="13:30" />
        <Picker.Item label="14:00" value="14:00" />
        <Picker.Item label="14:30" value="14:30" />
        <Picker.Item label="15:00" value="15:00" />
        <Picker.Item label="15:30" value="15:30" />
        <Picker.Item label="16:00" value="16:00" />
        <Picker.Item label="16:30" value="16:30" />
        <Picker.Item label="17:00" value="17:00" />
      </Picker>
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleScheduleAppointment}
      >
        <Text style={styles.buttonText}>Agendar Cita</Text>
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

export default ScheduleAppointmentScreen;
