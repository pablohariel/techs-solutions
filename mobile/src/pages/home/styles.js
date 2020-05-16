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
    }
});

// /* Principal cta */

// position: absolute;
// left: 14.93%;
// right: 14.93%;
// top: 74.14%;
// bottom: 19.21%;

// /* Shadow principal cta */
// box-shadow: 0px 2.76726px 2.21381px rgba(147, 120, 255, 0.0196802), 0px 6.6501px 5.32008px rgba(147, 120, 255, 0.0282725), 0px 12.5216px 10.0172px rgba(147, 120, 255, 0.035), 0px 22.3363px 17.869px rgba(147, 120, 255, 0.0417275), 0px 41.7776px 33.4221px rgba(147, 120, 255, 0.0503198), 0px 100px 80px rgba(147, 120, 255, 0.07);


// /* Background */

// position: absolute;
// left: 0%;
// right: 0%;
// top: 0%;
// bottom: 0%;




// /* Discover the platform */

// position: absolute;
// left: 15.21%;
// right: 15.21%;
// top: 29.63%;
// bottom: 29.63%;

// font-family: Roboto;
// font-style: normal;
// font-weight: normal;
// font-size: 40px;
// line-height: 47px;
// display: flex;
// align-items: center;
// text-align: center;

// color: #FFFFFF;

