import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../src/css/HomeStyle";

const HomeScreen = ({ userInfo, onLogout, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Bienvenido, {userInfo.name || "Usuario"}
      </Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Agendar Cita")}
        >
          <Text style={styles.menuItemText}>Agendar Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MedicalRecord")}
        >
          <Text style={styles.menuItemText}>Crear Expediente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Ver Expediente")}
        >
          <Text style={styles.menuItemText}>Ver Expediente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Actualizar Datos")}
        >
          <Text style={styles.menuItemText}>Actualizar Datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
          <Text style={styles.menuItemText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
