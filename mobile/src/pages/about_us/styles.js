import { StyleSheet } from 'react-native';
import { Dimensions, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        marginTop: hp('11%'),
        width:  hp('34%'),
        height: hp('64%')
    },
    text: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#000'
    }
})