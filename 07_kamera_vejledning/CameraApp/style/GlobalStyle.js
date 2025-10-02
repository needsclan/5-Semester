 import { StyleSheet } from 'react-native';
   
  const GlobalStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      safeview: {
        backgroundColor: 'black',
        flex: 1,
        width: '100%',
      },
      camera: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'transparent',
      },
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center',
      },
      buttonGallery: {
        fontSize: 15,
        color: 'white',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
      },
      gallery: {
        flex: 0.25,
        paddingTop: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      },
      snapbtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btn: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 40,
        padding: 12,
        alignSelf: 'center',
      },
    });
  
    export default GlobalStyles;