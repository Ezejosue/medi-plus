import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#394867",
    marginBottom: 30,
  },
  button: {
    width: 250,
    height: 200,
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
  menuContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  menuItem: {
    width: 250,
    height: 100,
    backgroundColor: "#394867",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
  },
  menuItemText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default styles;
