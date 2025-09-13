import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const InputComponent = () => {
  // 1. Opret state
  const [inputValue, setInputValue] = useState("");

  return (
    <View>
      {/* 2. TextInput der opdaterer state */}
      <TextInput
        placeholder="Skriv noget her..."
        value={inputValue}
        onChangeText={(txt) => setInputValue(txt)}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, marginBottom: 10 }}
      />

      {/* 3. Dynamisk tekst baseret på input */}
      <Text>Du har skrevet: {inputValue}</Text>
    </View>
  )};

export default InputComponent;

