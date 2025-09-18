import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { PEOPLE } from '../data/const';
import PictureComponent from '../components/PictureComponent';
import ButtonComponent from '../components/ButtonComponent';

import { GlobalStyle } from '../styles/GlobalStyle';

export default function ListScreen() {
  return (
    <View style={GlobalStyle.container}>
        <View style={{flex: 1 , backgroundColor: 'lightgrey', borderRadius: 10, width: '100%'}}>
            <FlatList
                data={PEOPLE}
                renderItem={({item}) => {
                    return(
                        <View style={GlobalStyle.itemContainer}>
                            <View style={GlobalStyle.contactContainer}>
                                <View style={GlobalStyle.pictureContainer}>
                                    <PictureComponent source={item.Picture} size = {100}/>
                                </View>
                                <View style={GlobalStyle.infoContainer}>
                                    <View style= {GlobalStyle.textContaiter}>
                                        <Text style={GlobalStyle.itemText}>{item.FullName}</Text>
                                    </View>
                                    <View style= {GlobalStyle.textContaiter}> 
                                        <Text style={GlobalStyle.itemText}>{item.JobTitle}</Text>
                                    </View>
                                    <View style= {GlobalStyle.textContaiter}>
                                        <Text style={GlobalStyle.itemText}>{item.Email}</Text>
                                    </View>
                                    <View style= {GlobalStyle.textContaiter}>
                                        <Text style={GlobalStyle.itemText}>{item.OfficeLocation}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style= {GlobalStyle.buttonContainer}>
                                <ButtonComponent title = {"View"} width={80} height={30} type={'secondary'} />
                                <ButtonComponent title = {"Call"} width={80} height={30} type={'primary'}/>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}
