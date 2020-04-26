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
        maxHeight: Dimensions.get('window').height - 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 10
    },
    logoImg: {
        width: 70,
        height: 70
    },  
    inputs: {
        paddingHorizontal: 24,
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
        marginHorizontal: 20,
    },
    sendButton: {
        backgroundColor:'#8FB28A',
        padding: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 24,
    },
    mediaButtonGroup: {
        alignItems: 'center',
        flexDirection: 'row'
    }
});