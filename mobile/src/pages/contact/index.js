import React from 'react';
import { ImageBackground } from 'react-native';

import Header from '../header';

import backgroundImg from '../../assets/contact/contact_background.png'
import styles from './styles';

export default function Contact() {
    return (
        <ImageBackground style={styles.container} source={backgroundImg}>  
            <Header />
        </ImageBackground>
    );
}