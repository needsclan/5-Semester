import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import FirstComponent from './components/FirstComponent';
import PropsComponent from './components/PropsComponent';
import InputComponent from './components/InputComponent';
import ButtonComponent from './components/ButtonComponent';
import AssetComponent from './components/AssetComponent';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Første komponent */}
      <View style={{flex: 1, backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <FirstComponent />
      </View>

      {/* Input komponent */}
      <View style={{flex: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <InputComponent />
      </View>

      {/* Asset komponent (billede) */}
      <View style={{flex: 4, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <AssetComponent url={require('./assets/favicon.png')} />
      </View>

      {/* Button komponent */}
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <ButtonComponent />
      </View>

      {/* Props komponent */}
      <View style={{flex: 1, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <PropsComponent name="Martin" />
      </View>

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
    paddingTop: 50,
  },
});
