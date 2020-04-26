import { StyleSheet } from 'react-native';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Dimensions.get('window').width - (Dimensions.get('window').width - 60),
        paddingTop: Dimensions.get('window').width - (Dimensions.get('window').width - 150),
        paddingBottom: Dimensions.get('window').width - (Dimensions.get('window').width - 162),
        // paddingTop: Constants.statusBarHeight,
        // borderWidth: 2,
        maxWidth:  Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height - 24,

        
    }
})