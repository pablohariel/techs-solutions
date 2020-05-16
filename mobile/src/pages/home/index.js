import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import backgroundImg from '../../assets/home_background.png';
import formImg from '../../assets/buttons/form_icon.png';
import aboutUsImg from '../../assets/buttons/about_us_icon.png';
import infoImg from '../../assets/buttons/info_icon.png';
import contactImg from '../../assets/buttons/contact_icon.png';
import BurgerImg from '../../assets/Home/burger.png'
import Logo from '../../assets/Home/logo.png'

import styles from './styles';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
    const navigation = useNavigation();

    function navigateTo(routeName) {
        navigation.navigate(routeName);
    }

    return (
        <ImageBackground style={styles.backgroundImg} source={backgroundImg}>
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.burgerButton} onPress={() => navigation.toggleDrawer()}>
                        <Image style={styles.burgerImg} source={BurgerImg} />         
                </TouchableOpacity>
            </View>
            
            <View style={styles.logoView}>
                <Image style={styles.logoImg} source={Logo} />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('Form')}>
                    <Text style={styles.buttonText}>Enviar nova solução</Text>
                </TouchableOpacity>
                <Text>Don't have a account, sign in</Text>
            </View>
        </ImageBackground>
    );
}