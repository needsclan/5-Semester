import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
    // Container 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ListScreen
    itemContainer:{
        // Tilføj styling til itemContainer her
    },
    infoContainer: {},
    pictureContainer: {},
    contactContainer: {},
    textContainer: {},
    buttonContainer: {
        flexDirection: 'row',
    },
    textContaiter: {},
    itemText: {},

    // ProfileScreen
    myProfilePictureContainer: {flex: 2, backgroundColor: "red", width: '100%'},
    profileInfoContainer: {flex: 7, backgroundColor: "green", width: '100%'},
    saveButtonContainer: {flex: 1, backgroundColor: "yellow", width: '100%'},


    // ButtonComponent
    primaryBtn: {
        pressedColor: '#d1e7ff',
        defaultColor: '#4A90E2',
    },
    primaryBtnText: {},
    secondaryBtn: {
        pressedColor: '#4A90E2',
        defaultColor: '#d1e7ff',
    },
    secondaryBtnText: {},

    // TextInputComponent
    inpLabel: {},
    textInput: {height: 40, width: 200, borderColor: 'gray', borderWidth: 1},

    // PictureComponent
    picture: {},

});