import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    backgroundImg: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        paddingHorizontal: 24,
        // paddingTop: Constants.statusBarHeight,
        margin: 0,
        height: Dimensions.get('screen').height - 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoImg: {
        width: 70,
        height: 70,
    },  
    inputs: {
    },  
    textInput: {
        height: 50,
        backgroundColor:'#fff',
        borderRadius: 4,
        borderBottomWidth: 3,
        borderBottomColor: '#8FB28A',
        padding: 10,
        margin: 8,
    },
    mediaButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediaButton: {
        marginHorizontal: 20
    },
    sendButton: {
        backgroundColor:'#8FB28A',
        padding: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
});