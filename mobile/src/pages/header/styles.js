import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '8%',
        backgroundColor: '#fff',
        height: hp('9%'),
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#6FCF97'
    },
    logoImg: {
        width: '18%',
        height: '100%'
    },  
})    