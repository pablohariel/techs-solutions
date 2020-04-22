import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useNavigationParam } from '@react-navigation/native';

import styles from './styles';

 export default function Gallery({ route, navigation }) {
    const [fls, setFls] = useState(route.params.files);

    useEffect(() => {
        console.log('oi')
        // setFls(videos);
        console.log(fls)
    }, [0])

    async function deleteFile(fl) {
        const new_fls = [];
        for(const f of fls) {
            if(f.path != fl.path) {
                new_fls.push(f);
            }
        }
        setFls(new_fls)
        route.params.setFiles(new_fls);
    }

    return (
        <View>
            {fls.map(fl => <TouchableOpacity onPress={() => deleteFile(fl)}><Image style={{ width: 100, height: 100, margin: 10 }} source={{ uri: fl.path}} /></TouchableOpacity>)}
        </View>
    )
}