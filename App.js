import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import LoginScreen from "./pages/Login.jsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LoginScreen
      onLogin={(username, password) => console.log(username, password)}
    />
  );
};

export default App;
