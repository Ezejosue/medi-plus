import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  searchContainer: {
    width: 300,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#394867",
    textAlign: "left",
    width: 250,
  },
  input: {
    width: 250,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 15,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#394867",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
  },

  buttonBack: {
    width: 250,
    height: 50,
    backgroundColor: "#394867",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },

  forgotPassword: {
    color: "#9BA4B5",
    marginBottom: 15,
    textAlign: "right",
    width: "80%",
    textDecorationLine: "underline",
  },
  register: {
    color: "#394867",
    fontSize: 15,
    textDecorationLine: "underline",
    width: 250,
    textAlign: "center",
  },
});

export default styles;