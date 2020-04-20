import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import backgroundImg from '../../assets/home_background.png';
import formImg from '../../assets/buttons/form_icon.png';
import aboutUsImg from '../../assets/buttons/about_us_icon.png';
import infoImg from '../../assets/buttons/info_icon.png';
import contactImg from '../../assets/buttons/contact_icon.png';
import styles from './styles';

export default function Home() {
    const navigation = useNavigation();

    function navigateTo(routeName) {
        navigation.navigate(routeName);
    }

    return (
        <ImageBackground style={styles.backgroundImg} source={backgroundImg}>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('Form')}>
                    <Image style={styles.buttonImg} source={formImg} /> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('AboutUs')}>
                    <Image style={styles.buttonImg} source={aboutUsImg} />         
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('Info')}>
                    <Image style={styles.buttonImg} source={infoImg} />    
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('Contact')}>
                    <Image style={styles.buttonImg} source={contactImg} /> 
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}