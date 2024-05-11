import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import RegisterScreen from "./pages/RegisterScreen";
import MedicalRecordScreen from "./pages/MedicalRecordScreen";
import SearchMedicalRecordScreen from "./pages/SearchMedicalRecordScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [navigationState, setNavigationState] = useState();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        setUserInfo(JSON.parse(user));
      }
    };
    checkLoginStatus();
    const loadNavigationState = async () => {
      const savedState = await AsyncStorage.getItem("@navigationState");
      if (savedState) {
        setNavigationState(JSON.parse(savedState));
      }
    };
    loadNavigationState();
  }, []);

  const handleLogin = (user) => {
    setUserInfo(user);
    AsyncStorage.setItem("@user", JSON.stringify(user));
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };
  return (
    <NavigationContainer
      initialState={navigationState}
      onStateChange={(state) =>
        AsyncStorage.setItem("@navigationState", JSON.stringify(state))
      }
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userInfo ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen
                  {...props}
                  userInfo={userInfo}
                  onLogout={handleLogout}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="MedicalRecord"
              component={MedicalRecordScreen}
            />
            <Stack.Screen
              name="SearchMedicalRecord"
              component={SearchMedicalRecordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
