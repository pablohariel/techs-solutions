import { StyleSheet } from 'react-native';

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
        width: '40%',
        height: 160,
        margin: 6,
    },
    buttonImg: {
        width: '100%',
        height: '100%'
    }
});