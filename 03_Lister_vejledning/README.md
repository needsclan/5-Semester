# React Native Arrays, Fetch, og FlatList Guide

I denne opgave vil du lære at arbejde med arrays, hente data med `fetch`, og bruge `FlatList`-komponenten til at vise en liste i React Native. Du vil få kodebider og "how-to" instruktioner til at bygge funktionaliteten selv.

## Slutresultat (sådan ca.)

https://user-images.githubusercontent.com/48329669/128570069-64627288-c9fa-4313-aa17-d727d279563e.mp4

# Documentationen (kig på dem)

https://reactnative.dev/docs/textinput <br>
https://reactnative.dev/docs/flatlist <br>
https://reactnative.dev/docs/style <br>
https://reactnative.dev/docs/statusbar <br>
https://reactnative.dev/docs/flatlist <br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

## Del 1 - Opret projekt & mappestruktur + test at app'en virker

1. Start med at navigere til din ønsket mappe i terminalen ved hjælp af `cd` og opret så et nyt React Native projekt:

   ```
   npx create-expo-app --template blank ListProject
   ```

   _Husk at navigere ind i projektet med `cd ListProject`_

   - Installer de nødvendige pakker med ``npm install```og evt. også:

   ```
   npx expo install @react-navigation/native
   npx expo install @react-navigation/native-stack
   npx expo install @react-navigation/bottom-tabs
   npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values
   ```

   - Kør den blanke app ved at skrive:

   ```
   npx expo start
   ```

   _Hvis du oplever problemer fordi du fx er på eduroam så kør følgende kommando:_

   ```
   npx expo start --tunnel
   ```

2. Opret følgende mapper og filer:
   - En mappe kaldet `data` med en fil `const.js` indeholdende:
     ```javascript
     export const CARS = [
       "Audi",
       "BMW",
       "Tesla",
       "Alfa oreo",
       "Ford",
       "Kia",
       "Rover",
       "Saab",
       "Seat",
       "Skoda",
       "Smart",
       "SsangYong",
       "Subaru",
       "Suzuki",
     ];
     export const COUNTRIES = ["Denmark", "England", "Spanien", "Italien"];
     export const GET_USERS_URL = "https://randomuser.me/api?results=";
     ```
   - En mappe kaldet `screens` med filerne:
     - `ArrayListScreen.js`
     - `FetchListScreen.js`
     - `FlatListScreen.js`

<br></br>

# APP.js opsætning

Opsæt en **Bottom Tab Navigator** i din app, så du kan navigere mellem de tre skærme, du har oprettet: `FlatListScreen`, `ArrayListScreen`, og `FetchListScreen`.

## Step 1 - Installer nødvendige dependencies

For at bruge navigation i React Native skal du først installere de nødvendige pakker - måske har du allerede installeret dem lige før inden du kørte appen, men der sker ikke noget ved at køre komandoen to gange :)

1. Installer React Navigation:

   ```
   npm install @react-navigation/native
   ```

2. Installer nødvendige dependencies til navigation:
   ```
   npm install @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
   ```

## Step 2 - Opsæt App.js med Navigation

1. Åbn din `App.js` fil, og start med at importere de nødvendige komponenter:

   ```javascript
   import { StatusBar } from "expo-status-bar";
   import { StyleSheet, View } from "react-native";
   import { NavigationContainer } from "@react-navigation/native";
   import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
   ```

2. Importér de tre skærme i `App.js`, som du har oprettet:

   ```javascript
   import ArrayListScreen from "./screens/ArrayListScreen";
   import FetchListScreen from "./screens/FetchListScreen";
   import FlatListScreen from "./screens/FlatListScreen";
   ```

3. **Opgave**:

   - Opret en `Tab.Navigator`, der viser de tre skærme som tabs i bunden af appen.
   - For hver skærm, skal du give en `name` og en `component` for at tilføje den til navigatoren.

   Du kan bruge følgende som guide:

   ```javascript
   const Tab = createBottomTabNavigator();

   export default function App() {
     return (
       <NavigationContainer>
         <Tab.Navigator>
           {/* Tilføj FlatListScreen som en skærm */}
           {/* Tilføj ArrayListScreen som en skærm */}
           {/* Tilføj FetchListScreen som en skærm */}
         </Tab.Navigator>
       </NavigationContainer>
     );
   }
   ```

   **Tip**
   Hvis du er gået i stå, er der her et tip, der kan guide dig på vej

   ```javascript
   <Tab.Screen name="Flat List" component={FlatListScreen} />
   ```

## Step 3 - Styling af App.js

1. **Opgave**:

   - Tilføj en simpel styling til appen for at sikre, at indholdet bliver centreret, og at baggrunden er hvid.

   Brug dette som en guide:

   ```javascript
   const styles = StyleSheet.create({
     container: {
       flex: ,
       backgroundColor: '',
       alignItems: '',
       justifyContent: '',
     },
   });
   ```

   - I næste øvelse lærer du at bruge global stylesheet men for nu tilføjer du blot styling i `App.js`

## Step 4 - Test navigationen

1. Start din app ved at køre:

   ```
   npx expo start
   ```

2. Tjek, om du kan se de tre tabs i bunden af skærmen.

<br></br>

# Tilbage til listerne

## Del 2 - FlatListScreen.js

**FlatListScreen** skal bruge `FlatList` til at vise en liste over biler.

1. Åbn `FlatListScreen.js`, og start med at importere de nødvendige komponenter:

   ```javascript
   import { StatusBar } from "expo-status-bar";
   import { StyleSheet, Text, View, FlatList } from "react-native";
   ```

   <b>husk også at importere din `{CARS}` data!</b>

   **Tip**

   ```javascript
   import { CARS } from "../data/const";
   ```

2. **Opgave**:

   - Brug `FlatList` til at vise hvert bilnavn i en liste.
   - Brug `data`-props til at give `CARS` arrayet til `FlatList`.
   - I `renderItem` skal du returnere en `Text`-komponent, der viser hver bil i arrayet.

   **Tip**
   Du kan bruge dette som en guide:

   ```javascript
   export default function FlatListScreen() {
     return (
       <View style={styles.container}>
         <Text style={{ fontSize: 20, textAlign: "center", padding: 40 }}>
           1 Mine biler - Flatlist
         </Text>
         <View
           style={{
             height: 150,
             backgroundColor: "lightgrey",
             borderRadius: 10,
             width: "80%",
           }}
         >
           {/* Opret en FlatList, der viser bilerne fra CARS arrayet */}
         </View>
         <StatusBar style="auto" />
       </View>
     );
   }
   ```

   **Tip**
   Kig her hvis du er gået i stå

   ```javascript
   <FlatList
     data={/*..*/}
     renderItem={({ /*..*/ }) => {
       return (
         <Text style={{ fontSize: 15, textAlign:/*..*/,padding:10 }}> /*..*/: {item}</Text>
       );
     }}
   />
   ```

3. **Stylingsopgave**:
   - Giv `FlatList`'en en baggrundsfarve og afrundede kanter for at adskille listen visuelt.

## Del 3 - ArrayListScreen.js

**ArrayListScreen** skal bruge `map()` til at vise et array af lande.

1. Åbn `ArrayListScreen.js`, og importér de nødvendige komponenter:

   ```javascript
   import { StatusBar } from "expo-status-bar";
   import { StyleSheet, Text, View, ScrollView } from "react-native";
   ```

   <b>husk at importere din `{COUNTRIES}` data!!</b>
   Hvis du ikke kan huske hvordan du importerer det, så gå tilbage til `FlatListScreen.js` og hent inspiration

2. **Opgave**:

   - Brug `map()` til at iterere over `COUNTRIES`-arrayet og vise hvert land i en `Text`-komponent.
   - Vis listen over lande inde i en `ScrollView`, så du kan rulle igennem dem.

   Du kan bruge dette som en guide:

   ```javascript
   export default function ArrayListScreen() {
     return (
       <View style={styles.container}>
         <Text style={{ fontSize: 20, textAlign: "center", padding: 40 }}>
           2 KvartFinale lande - Array Map
         </Text>
         <View
           style={{
             height: 150,
             backgroundColor: "lightgrey",
             borderRadius: 10,
             width: "80%",
           }}
         >
           <ScrollView>
             {/* Brug map til at iterere over COUNTRIES arrayet */}
           </ScrollView>
         </View>
         <StatusBar style="auto" />
       </View>
     );
   }
   ```

   **Tip**
   Se her hvis du er gået i stå med scrollview eller se det vedhæftede billede

   ```javascript
   <ScrollView>
     {/*...*/.map((/*...*/, /*...*/) => {
       return (
        <Text key={key} style={{ fontSize: 15, textAlign:/*...*/,padding:10 }}>{country} er et godt land!</Text>
       );
     })}
   </ScrollView>
   ```

3. **Stylingsopgave**:
   - Giv `ScrollView`'en en baggrundsfarve og sørg for at stilen er konsistent med de andre skærme.

## Del 4 - FetchListScreen.js

**FetchListScreen** skal bruge `fetch()` til at hente en liste af brugere og vise dem i en liste.

1. Åbn `FetchListScreen.js`, og start med at importere de nødvendige hooks og komponenter:

   ```javascript
   import { StatusBar } from "expo-status-bar";
   import {
     StyleSheet,
     Text,
     View,
     Image,
     SafeAreaView,
     ScrollView,
     TextInput,
     TouchableWithoutFeedback,
     Keyboard,
   } from "react-native";
   import { useState, useEffect } from "react";
   ```

   <b> Huske også at importere din `{GET_USERS_URL}` data! </b>

2. **Opgave**:

   - Opret en state til at gemme brugere og en funktion til at hente data fra `GET_USERS_URL`.
   - Brug `useEffect` til at hente data, når komponenten indlæses.
   - Vis brugerens navn og billede i en liste.

   Du kan bruge dette som en guide:

   ```javascript
   export default function FetchListScreen() {
     const [user, setUser] = useState([]);
     const [msg, setMsg] = useState("");
     const [amount, setAmount] = useState(2);

     const loadUsers = async () => {
       // Opret fetch-kaldet her
     };

     useEffect(() => {
       loadUsers();
     }, [amount]);

     return user.length > 0 ? (
       <View style={styles.container}>
         <Text style={{ fontSize: 20, textAlign: "center", padding: 40 }}>
           2 3 Brugere i liste: {user.length} - Fetch Object list
         </Text>
         {/* Opret en TextInput til at ændre antal brugere */}
         <View
           style={{
             height: 350,
             backgroundColor: "lightgrey",
             borderRadius: 10,
             width: "80%",
           }}
         >
           <ScrollView>
             {/* Brug map() til at vise brugerens navn og billede. Tip: Se det vedhæftede billede*/}
           </ScrollView>
         </View>
         <Text>{msg ? msg : ""}</Text>
         <StatusBar style="auto" />
       </View>
     ) : (
       <View style={styles.container}>
         <Text>Loading...</Text>
         <StatusBar style="auto" />
       </View>
     );
   }
   ```

3. **Ekstra opgave**:
   - Opret en `TextInput`, der lader brugeren ændre antallet af brugere, som skal hentes.
   - Sørg for at håndtere fejl i `fetch()` og vis en besked, hvis noget går galt.

## Del 5 - Test din app

1. Start din app ved at køre:

   ```
   npx expo start
   ```

2. Test hver skærm, og sørg for at alle listerne vises korrekt.

## Ekstra / Udfordring ┌( ಠ_ಠ)┘

1. Tilføj ikoner til hver tab i navigatoren ved at bruge `tabBarIcon`-props, så hver skærm har sit eget ikon.
2. Udvid funktionaliteten i **FetchListScreen** ved at tilføje flere detaljer om hver bruger - læs mere om api'en her : https://randomuser.me/.
