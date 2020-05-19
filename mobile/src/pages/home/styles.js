import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';


export default StyleSheet.create({
    
    backgroundImg: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
        // alignItems: 'center',
        // resizeMode: 'cover',
    },
    buttons: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '80%',
        height: '40%',        
    },
    button: {
        backgroundColor: '#6FCF97',
        borderRadius: 28,
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        padding: '9%',
        width: '90%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',  
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },   
        shadowOpacity: 0.8,
        shadowRadius: 2,   
        elevation: 1,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonImg: {
        width: '100%',
        height: '100%'
    },
    logoView: {
        width: '54%',
        height: '34%',
        marginRight: '3%'
    },
    logoImg: {
        width: '100%',
        height: '100%'
    },
    burgerButton: {
        width: '15%',
        height: '90%',
        margin: '4%'
    },  
    burgerImg: {
        width: '100%',
        height: '100%'
    },
    headerView: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textVideoTutorial: {
        marginTop: 20,
        fontFamily: 'Open Sans'
    },

    // video tutorial 
    mainModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.9)',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    childModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.9)',
        alignItems: 'stretch'
    },
    modalButton: {
        paddingTop: 10,
        color: '#000'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalText: {
        backgroundColor: '#fff',
        height: 200,
    },
    videoTutorial: {
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
    }
});

