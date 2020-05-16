import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Logo from '../../assets/logo.png';

import styles from './styles';

export default function Header() {

    const navigation = useNavigation();

    async function navigateBack() {
        navigation.goBack();  
    }

    return (
        <View style={styles.header}>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>Sobre nós</Text>
            <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-left" size={28} color="#6FCF97" />
            </TouchableOpacity>
        </View>
    )
}