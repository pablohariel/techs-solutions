import { StyleSheet } from 'react-native';
import { Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height,
    }
})