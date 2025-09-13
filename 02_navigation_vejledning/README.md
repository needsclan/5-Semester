# Navigation | (• ◡•)| (❍ᴥ❍ʋ)

## Del 1 - Opret projekt & fil struktur

1. Start med at navigere til en mappe og oprette en ny projekt med terminalen
```
npx create-expo-app --template blank 02_Navigation
```
*Husk at navigere indtil projektet med `cd 02_Navigation`*

2. Oprette fil strukturen:
- Opret en mappe kaldt "components"
- Opret en mappe kaldt "screens"
- Naviger ind i screens mappen og opret en mappe kaldt "StackScreens"

3. Læs dokumentationen og Installér de dependencies som vi skal bruge:
   - https://reactnavigation.org/docs/getting-started

Din `package.json` skulle gerne indeholde disse dependencies efter du har installeret det du skal bruge: 
```javascript
 "dependencies": {
    "@react-native-vector-icons/ionicons": "^12.3.0",
    "@react-navigation/bottom-tabs": "^7.4.7",
    "@react-navigation/elements": "^2.6.4",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.26",
    "@react-navigation/stack": "^7.4.8",
    "expo": "~54.0.0",
    "expo-status-bar": "~3.0.8",
    "react": "19.1.0",
    "react-native": "0.81.4",
    "react-native-safe-area-context": "5.6.0",
    "react-native-screens": "~4.16.0"
  },
```
*tip* du kan også kopiere overstående ind i din `package.json` og kører `npm install` efterfølgende.

4. Test om det hele virker ved at kopiere dette lille eksempel ind i jeres App.js - [https://reactnavigation.org/docs/tab-based-navigation/#minimal-example-of-tab-based-navigation](https://reactnavigation.org/docs/hello-react-navigation/). Hvis det virker, så forsæt (ﾉ^_^)ﾉ

<br></br>

## Del 2 - Tab Navigator

I denne del skal vi bygge en tab navigator til at navigere mellem 3 tabs.

1. Opret tre skærme som vi skal navigere imellem i "screens" mappen:
   - HomeScreen.js
   - SettingsScreen.js
   - DetailsScreen.js

2. Kopier koden ind fra App.js ind i hver fil - Husk at ændre `export default function App() {` til navnet på den pågændende skærm. Eksempel: i HomeScreen.js ændres funktionnavnet til HomeScreen - `export default function HomeScreen() {`

3. Ændre også i `<Text>` teksten til "Welcome to the <--Skærmnavn-->" så man kan se forskellen i dem.

4. Gå nu ind i app.js filen og importer de nyopretterede filer: `import HomeScreen...`

5. Når dette er sket, er du klar til at begynde med at bygge din Tab Navigator

### Tab Navigator setup
1. Vi skal arbejde i App.js
2. Importere føglende pakker ind til filen
```
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
```
3. Indsæt `const Tab = createBottomTabNavigator();` før `export default function App()`. Denne funktion sørger for at navigation mellem tabs fungere.

4. Slet alt ind i return funktionen, og indsæt:
```
<NavigationContainer>
    <Tab.Navigator>
        {/* Noget kommer her, så slet mig helt i næste step */}
    </Tab.Navigator>
</NavigationContainer>
```
* Husk: Alt navigation i react native skal altid være i en "NavigationContainer"

5. Nu skal du til at definere de forskellige tabs som vores tab navigator skal indeholde. For at tilføj en tab bruger man:
```
<Tab.Screen name="Navnet på tab" component={DenImporteretScreen} />
```
Eks. med HomeScreen:

```
<Tab.Screen name="Home" component={HomeScreen} />
```

6. Tilføj i Details og Settings

7. Start din app og se om det hele fungere! :-)

<br></br>

## Del 3 - Stack Navigator [se dokumentation](https://reactnavigation.org/docs/stack-navigator/)

Sluk jeres server før i fortsætter her. Det gør i ved at trykke på crtl + c i terminalen (control + c på Mac)

1. Start med at oprette de filer som vi skal bruge:
* I components mappen:
    * ButtonComponents.js
    * StackComponent.js
* I screens/StackScreens mappen:
    * AppDetailsScreen.js
    * UserProfileScreen.js

2. Kopier basis snippet ind i hver fil, den kan du hente nederst i denne guide under [Snippets](#Snippets). Husk at tilpasse navnet på funktionen!

3. Gå til din StackComponent.js hvor vi skal arbejde videre i de næste steps.

4. Importere createStackNavigator:
```
import { createStackNavigator } from '@react-navigation/stack';
```
5. Lige som med tab screen skal du indsætte `const Stack = createStackNavigator();` inden component funktionen.

6. Slet alt i `return` og tilføj:
```
<Stack.Navigator initialRouteName="Details Screen">
    <Stack.Screen name="Details Screen" component={DetailsScreen} />
    <Stack.Screen name="User Profile" component={UserProfileScreen} />
    <Stack.Screen name="App Details" component={AppDetailsScreen} />
</Stack.Navigator>
```

7. Gå tilbage til din App.js-fil, og find din Tab Navigator. Her skal du erstatte DetailScreen-componenten med StackNavigation. Koden skal se sådan ud:
  `<Tab.Screen name="Details" component={StackNavigation} />`.
Grunden til dette er, at vi nu indsætter vores Stack Navigator ind i Tab Navigatoren – og den er i forvejen pakket ind i en Navigation Container.

### Button Component
Næste step i Stack Navigation er at får navigationen til at fungere, men til det, skal vi have nogle knapper. Fordi vi ønsker at genbrug knap-designet flere gang, laver vi en component. Så gå til ButtonComponent.js for at lave den.

8. Vi skal have nogle props, så vi kan gøre knappens tekst og funktionalitet variabel. Derfor insæt `{ title, onPress }` i din componentets funktion, sådan at den ser sådan ud: `export default function ButtonComponent({ title, onPress }){...`

9. Erstat alt i `return` med:
```
<Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
</Pressable>
```
10. I din styles sektion, fjern container style og tilføj styling til button og text:
```
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: 'green',
    margin: 20,
    },
text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    },
```

11. Så er din button component klar, og vi fortsætter udvikling på Stack Navigator.

### Stack Navigator Continued

12. I din DetailsScreen.js, tilføj nedenstående snippet før din DetailScreen funktion. Det definerer navigationsfunktionen
```
const navController = (navigation, route) =>{
    navigation.navigate(route)
}
```

13. Ind i DetailScreen funktion, indsæt `{navigation}` indeni parentesen.

14. Slet `<Text> Welcome...</Text>` 

15. Importer din ButtonComponent og indsæt koden indeni `<View>` hvor jeres text lå.
```
 <ButtonComponent onPress ={()=>navController(navigation,'User Profile')} title="User Profile"/>
        <ButtonComponent onPress ={()=>navController(navigation,'App Details')} title="App Details"/>
``` 

16. Ind i container style for henholdsvis AppDetails.js screen og UserProfileScreen.js indsætte:

```
    borderWidth: 10,
    borderColor: 'red',

    &

    borderWidth: 10,
    borderColor: 'yellow',
```

17. Tænd jeres app og se om i kan navigere rundt!


### Extra / Challenge  ┬┴┬┴┤ʕ•ᴥ├┬┴┬┴

18. Hvis du ønsker en knap som kan navigere tilbage, kan du anvende din Button component i AppDetailsScreen.js og UserProfilScreen.js. På dens OnPress funktion, kan i brug koden: `onPress ={()=>navigation.goBack()}`for at returnere til den forige skærm. Samt kan man søge på hvordan man kan fjerne den standart header som kommer automatisk med på hver side. [Find inspiration her!](https://reactnavigation.org/docs/headers/)

19. Prøv at konfigurer jeres header med noget nyt og mere spændende! https://reactnavigation.org/docs/headers/#adjusting-header-styles

20. Prøv at ændre jeres tap icons. Check eksemplet her: https://reactnavigation.org/docs/bottom-tab-navigator/#example 

## Snippets
### Basis Snippet
```
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function SomeComponent() {
  return (
    <View style={styles.container}>
      <Text>Some text here!!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
