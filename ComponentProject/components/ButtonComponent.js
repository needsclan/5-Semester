import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const ButtonComponent = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={{ marginTop: 40, padding: 20, backgroundColor: '#eee', borderRadius: 10 }}>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>
        {isPressed ? "Ja til kode!" : "Nej til kode"}
      </Text>

      <Button
        title="👉 Tryk mig 👈"
        color="blue" // giver knappen en synlig farve
        onPress={() => setIsPressed(!isPressed)}
      />
    </View>
  );
};

export default ButtonComponent;
