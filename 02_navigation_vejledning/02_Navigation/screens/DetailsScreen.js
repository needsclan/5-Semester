import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponents';


// Lille controller-funktion som i guiden
const navController = (navigation, route) => {
navigation.navigate(route);
};


export default function DetailsScreen({ navigation }) {
return (
<View style={styles.container}>
<ButtonComponent
onPress={() => navController(navigation, 'User Profile')}
title="User Profile"
/>
<ButtonComponent
onPress={() => navController(navigation, 'App Details')}
title="App Details"
/>
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
},
});