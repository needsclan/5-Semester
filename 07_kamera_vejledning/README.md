# 07_kamera_vejledning
I denne guide skal vi arbejde med kameraet i en React Native-app. Vi bruger Expo's indbyggede `expo-camera` og `expo-image-picker` til at få adgang til kamera og billeder.

Læs dokumentationen her:
- https://docs.expo.dev/versions/latest/sdk/camera/
- https://docs.expo.dev/versions/latest/sdk/imagepicker/

## Start med at sætte dit projekt op

1. Opret et nyt projekt
  ````
   npx create-expo-app CameraApp --template blank
  ````
3. Naviger ind i din projektmappe
  ````
  cd CameraApp
  ````
5. Download følgende dependencies: 
- `npm install @react-navigation/bottom-tabs`
- `npm install @react-navigation/stack`
- `npx expo install expo-camera`
- `npx expo install expo-image-picker`
- `npm install react-native-safe-area-context`

## Indsæt dette i app.json
````
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}
````

Nu er du klar til at begynde at arbejde med kameraet i dit projekt!

# Opret appens skelet 
1. Opret to mapper i roden af dit projekt ved navn screens og style
2. Naviger ind i screens og opret to filer:
  - CameraTest.js
  - ImageScreen.js
3. Naviger ind i style og opret en fil:
  - GlobalStyle.js
Insæt følgende styling - vi kommer til at bruge det løbende 
  ````
  import { StyleSheet } from 'react-native';
   
  const GlobalStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      safeview: {
        backgroundColor: 'black',
        flex: 1,
        width: '100%',
      },
      camera: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'transparent',
      },
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
      },
      buttonGallery: {
        fontSize: 15,
        color: 'white',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
      },
      gallery: {
        flex: 0.25,
        paddingTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      },
      snapbtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 40,
        padding: 12,
        alignSelf: 'center',
      },
    });
  
    export default GlobalStyles;
  ````
  
4. Tjek om navigationen virker ved at indsætte følgende i de to filer:
  #### CameraTest.js:
  ````
  import React from 'react';
  import { Button, StyleSheet } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  export default function CameraTest({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Gå til billedskærm"
          onPress={() => navigation.navigate('image')}
        />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  ````
  #### ImageScreen.js:
  ````
  import React from 'react';
  import { Text, StyleSheet } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  export default function ImageScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Image Screen</Text>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center', // centrer lodret
        alignItems: 'center',     // centrer vandret
        backgroundColor: '#fff',
      },
    });
  ````

## Opret Stack Navigation i App.js
Formålet er at kunne navigere mellem de to skærme 
Du kan læse om Stack Navigator her: https://reactnavigation.org/docs/stack-navigator/

1. Importer de nødvendige dependencies og skærme
2. Opret en const
3. Opstil din navigation

**Hint:** 
````
import 
import 
import 
import 
import 

export default function App() {
  const ?? = ??();
  return (
    <??>
      <??>
        <?? name={'home'} component={???} options={{headerShown: false}} />
        <?? name={'image'} component={???} />
      </??>
    </??>
  );
}
````

## Test navigationen

Start din app og test om det virker 
````
npx expo start
````

Hvis din navigation ikke virker, så sikre dig at dine imports er rigtige.

## Hvis din navigation virker - Arbejd videre i CameraTest.js

### 1. Importer nødvendige moduler
- useState, useRef: React hooks til at gemme data og lave en reference til kameraet.
- Komponenter: De nødvendige React komponenter
- CameraView: selve kameraet (fra expo-camera).
- useCameraPermissions: spørger brugeren om tilladelse til at bruge kameraet.
- Ionicons: små ikoner til knapperne.
- GlobalStyle: vores egne CSS-lignende styles.
  
  ````
  import React, { useState, useRef } from 'react';
  import {
    Button,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { CameraView, useCameraPermissions } from 'expo-camera';
  import GlobalStyle from '../style/GlobalStyle';
  import Ionicons from '@expo/vector-icons/Ionicons';
  ````
### 2. State og permission

Opret de state du skal bruge:
- facing: om kameraet vender front/back.
- permission: tilladelse til kamera.
- imagesArr: en liste af billeder.
- loading: om appen er i gang med at tage billede.
- gallery: styrer om galleriet vises.
- cameraRef: reference til kameraet.

  Hint: 
  ````
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  // resten laver du selv
  ````

### 3. Håndtering af tilladelser
Hvis appen ikke har fået kamera-tilladelse, skal vi spørge brugeren:

````
if (!permission) return <View />;

if (!permission.granted) {
  return (
    <View>
      <Text>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  );
}
````

Opgave: Sæt selv styles på `<View>` og `<Text>`

### 4. Kamera-funktioner

#### - Funktion til at skifte kamera
````
function toggleFacing() {
  setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
}
````

#### - Funktion til at tage billede
- Lav nu en asynkron funktion der hedder snap som bruger setLoading og setImageArrd.
````
  ???() {
    if (!cameraRef.current) return;
    try {
      ???(true);
      const result = await cameraRef.current.takePictureAsync();
      ???([...imagesArr, result]);
    } catch (err) {
      console.log('Snap error:', err);
    } finally {
      ???(false);
    }
  }
````

### 5. Toggle galleri
Lav nu en function der hedder toggleGallery som bruger setGallery.
````
    function ???() {
    ???((prev) => !prev);
  }
````

### 6. Galleriet 
I denne del af guiden skal du implementere en galleri-komponent, der viser de billeder, du har taget med kameraet. Galleriet vil være rulleligt og vise en besked, hvis der endnu ikke er taget nogen billeder.

- Her skal lave en CameraGallery const og bruge imagesArr useState. Derudover skal du bruge et komponent der kan scrolle igennem billederne.  
````
const ??? = () => (
  <View>
    <Text>Billeder taget: {???.length}</Text>
    // skal man kunne scrolle igennem billederne
    <???>
    </???>
  </View>
);
````

- For at kunne se billederne skal vi bruge `ScrollView` (Hint til opgaven ovenover). Inde i `ScrollView` bruger vi en simpel conditional rendering. Hvis der findes billeder i `imagesArr`, vil vi bruge `map()` til at vise hvert billede som en `Image`-komponent inde i en `TouchableOpacity`. Hvis der ikke er nogen billeder, vil der i stedet blive vist en besked, der siger "No images taken".
- Indsæt dette i konstanten 

````
<ScrollView horizontal>
      {imagesArr.length > 0 ? (
        imagesArr.???((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('image', { image: image.uri })}
          >
            <Image source={{ uri: image.uri }} style={{ width: 80, height: 80 }} />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No images taken</Text>
      )}
    </ScrollView>
````

### 7. Return
Indsæt til sidst denne return funktion og færdiggør den med logik og styling
````
return (
    <SafeAreaView style={???}>
      <View style={???}>
        <CameraView ref={??? /*her vil vi gerne ref til kamera*/} style={???} facing={facing}>
          <View style={???}>
            {/* Flip kamera */}
            <TouchableOpacity style={???} onPress={??? /*her vil vi gerne skifte kamera*/}>
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Tag billede */}
            <TouchableOpacity style={???} onPress={??? /*her vil vi gerne tage et foto*/}>
              <Text style={}>{loading ? '...' : ''}</Text>
            </TouchableOpacity>

            {/* Toggle galleri */}
            <TouchableOpacity style={???} onPress={??? /*her vil vi gerne komme ind på gallery*/}>
              <Ionicons name="images-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
        {gallery ? <CameraGallery /> : null}
      </View>
    </SafeAreaView>
  );
````

Tillykke nu er du færdig med CameraTest.js.

## ImageScreen.js
Denne fil viser billedet i fuld størrelse.

Indsæt følgende i filen:
````
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import GlobalStyle from '../style/GlobalStyle';

export default function ImageScreen({ route }) {
  const { image } = route.params || {};

  return (
    <View style={GlobalStyle.container}>
      {image ? (
        <Image source={{ uri: image }} style={GlobalStyle.img} />
      ) : (
        <Text style={{ color: 'white' }}>Ingen billede valgt</Text>
      )}
    </View>
  );
}
````

Reflekter over:
- Hvorfor bruger vi route.params her?
- Hvad sker der, hvis route.params er tom?

