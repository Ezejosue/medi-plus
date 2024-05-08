import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#394867",
  },
  input: {
    width: "80%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 15,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#394867",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50,
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
  },
});

export default styles;
