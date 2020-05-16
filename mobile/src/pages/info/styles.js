import { StyleSheet } from 'react-native';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingBottom: '36%',
        // paddingTop: Constants.statusBarHeight,
        // borderWidth: 2,
        maxWidth:  Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
    },
    text: {
        paddingHorizontal: '30%',
        alignSelf: 'center',
        marginTop: '20%'
    }
})