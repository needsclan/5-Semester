import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function UserProfileScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>Welcome to the UserProfileScreen</Text>
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
borderWidth: 10,
borderColor: 'yellow',
},
title: {
fontSize: 18,
fontWeight: '600',
},
});