import { StyleSheet } from 'react-native';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        maxWidth:  Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    mainView: {
        marginTop: '19%',
        width: '60%',
        height: '64%'
    },
    text: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#000'
    }
})