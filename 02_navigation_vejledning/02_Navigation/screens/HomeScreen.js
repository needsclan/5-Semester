import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Welcome to the HomeScreen</Text>
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#f2f2f2',
},
title: {
fontSize: 18,
fontWeight: '600',
},
});