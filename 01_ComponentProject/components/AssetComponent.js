import React from 'react';
import { Image, View } from 'react-native';

const AssetComponent = ({ url }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Image
        source={url}                // billedet kommer ind som prop
        style={{ width: 100, height: 100 }}
        resizeMode="contain"        // sørger for billedet ikke strækkes grimt
      />
    </View>
  );
};

export default AssetComponent;
