import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
    // Container 
    container: {
        flex: 1,
        backgroundColor: '#FFF2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ListScreen
    itemContainer:{
        backgroundColor: 'white',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flex: 1,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactContainer: {
        flexDirection: 'row',
        flex: 3,
    },
    infoContainer: {
        flex:2,
        
    },
    pictureContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
    },
    itemText: {
        fontSize: 12,
        fontFamily: 'Segoe UI',
        fontWeight: 'semi-bold',
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex:2,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        
    },

    // ProfileScreen
    myProfilePictureContainer: {
        flex: 3, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfoContainer: {
        flex: 6, 
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%'
    },
    saveButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%'
    },


    // ButtonComponent
    primaryBtn: {
        pressedColor: '#FFCCCC',
        defaultColor: '#FF0000',
        borderRadius: 50,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    primaryBtnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Segoe UI',
        fontWeight: 'bold',
    },
    secondaryBtn: {
        pressedColor: '#FFCCCC',
        defaultColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FF0000',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    secondaryBtnText: {
        color: '#FF0000',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Segoe UI',
        fontWeight: 'bold',
    },

    // TextInputComponent
    inpLabel: {
        fontSize: 14,
        fontFamily: 'Segoe UI',
        fontWeight: 'normal',
        color: 'lightgray',
        marginBottom: 5,
    },
    textInput: {
        height: 50, 
        width: 300, 
        borderColor: 'lightgray',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 16,
        borderWidth: 1,
    },

    // PictureComponent
    picture: {
        borderColor: 'lightgray',
        borderWidth: 2,
    },

});