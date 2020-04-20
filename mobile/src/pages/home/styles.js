import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
         justifyContent: 'center',
         alignItems: 'center'
    },
    backgroundImg: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%',
        padding: 3,
    },
    button: {
        width: '46%',
        height: 140,
        margin: 6,
        borderRadius: 6
    },
    buttonImg: {
        width: '100%',
        height: '100%'
    }
});