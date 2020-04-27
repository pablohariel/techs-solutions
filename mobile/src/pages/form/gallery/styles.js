import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    imageWrap: {
        margin: 2,
        padding: 2,
        height: (Dimensions.get('screen').height/3) - 12,
        width: (Dimensions.get('screen').width/2) - 4,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    text: {
        color: '#fff'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})