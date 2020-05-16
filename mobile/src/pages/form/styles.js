import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    backgroundImg: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        // paddingHorizontal: 24,
        // paddingTop: Constants.statusBarHeight,
        height: Dimensions.get('window').height - 24,
        maxHeight: Dimensions.get('window').height,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '8%',
        paddingTop: '8%'
    },
    logoImg: {
        // width: 70,
        // height: 70
        width: '18%',
        height: '220%'
    },  
    inputs: {
        width: '90%',
        marginTop: '10%',
        paddingHorizontal: '6%',
    },  
    textInput: {
        height: 40,
        backgroundColor:'#fff',
        borderRadius: 4,
        borderBottomWidth: 3,
        borderBottomColor: '#6FCF97',
        padding: '1%',
        margin: '1%',
    },
    mediaButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediaButton: {
        marginHorizontal: '4%',
    },
    sendButton: {
        width: '90%',
        backgroundColor:'#6FCF97',
        padding: '8%',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '6%',
        marginBottom: '4%'
    },
    mediaButtonGroup: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    galleryLink: {
        marginTop: '10%'
    },
    termsView: {
        width: '46%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    checkbox: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        left: 0,
        borderWidth: 0,
        marginRight: 0,
        marginLeft: 0

    },
    checkboxDisabled: {
        opacity: 0,
    },
    checkboxText: {
        height: 20,
        fontWeight: '100',
        color: '#000',
    },
    checkboxLink: {
        height: 20,
        borderBottomWidth: 1
    },
    checkboxLinkDisabled: {
        opacity: 0
    },

    // modal form
    modal: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgba(0,0,0, 0.9)',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        borderWidth: 3
    },
    modalButton: {
        paddingTop: 10,
        color: '#fff'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalText: {
        backgroundColor: '#fff',
        height: 160,
    }

});