import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    backgroundImg: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
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
        marginTop: 10
    },
    logoImg: {
        width: wp('20%'),
        height: hp('12%'),
    },  
    inputs: {
        width: '90%',
        marginTop: hp('0%'),
        paddingHorizontal: '6%',
        justifyContent: 'center',
    },  
    textInput: {
        height: 40,
        backgroundColor:'#fff',
        borderRadius: 4,
        borderBottomWidth: 3,
        borderBottomColor: '#6FCF97',
        padding: '1%',
        margin: '1%',
        marginTop: hp('2%')
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
        marginTop: '10%',
        borderBottomWidth: 1
    },
    termsView: {
        width: wp('50%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: hp('2%'),
        marginLeft: '1%'
    },
    checkbox: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        left: 0,
        borderWidth: 0,
        marginRight: 0,
        marginLeft: 0,

    },
    checkboxDisabled: {
        opacity: 0,
    },
    checkboxText: {
        height: 20,
        fontWeight: 'normal',
        color: '#000',
    },
    checkboxLink: {
        height: 20,
        fontWeight: 'normal',
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

        flexDirection: 'column',
        borderWidth: 3
    },
    modalButton: {
        marginTop: hp('20%'),
        marginHorizontal: wp('10%'),
        paddingTop: 10,
        color: '#fff'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalScroll: {
        marginHorizontal: wp('10%'),
        borderWidth: 5,
        borderColor: '#6FCF97',
        marginBottom: hp('44.1%')
    },
    modalText: {
        backgroundColor: '#fff',
        height: hp('20%')
        
    }
});