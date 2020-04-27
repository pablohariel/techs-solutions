import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    backgroundImg: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        // resizeMode: 'cover',
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%',
    },
    button: {
        width: '38%',
        height: Dimensions.get('window').width - (Dimensions.get('window').width - 150),
        margin: 10,
    },
    buttonImg: {
        width: '100%',
        height: '100%'
    }
});