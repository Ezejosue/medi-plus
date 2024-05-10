import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
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

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },

  buttonGoogle: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#DD4B39",
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 250,
  },

  buttonGoogleText: {
    color: "#000",
    fontSize: 16,
  },

  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
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
