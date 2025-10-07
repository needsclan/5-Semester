// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "./database/database"; 
import AuthScreen from "./screens/AuthScreen"; 
import TabsNavigator from "./navigation/TabsNavigator"; // faneblade til hoved-appen

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); // gemmer om brugeren er logget ind

  useEffect(() => {
    // tjekker automatisk om brugeren er logget ind eller ej
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub; // rydder op når komponenten lukker
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? ( 
          // Hvis brugeren er logget ind → vis hoved-appen med faner
          <Stack.Screen name="AppTabs" component={TabsNavigator} />
        ) : ( 
          // Hvis ikke logget ind → vis login/registrering
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
