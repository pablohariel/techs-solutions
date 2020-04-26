import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation, useNavigationParam } from '@react-navigation/native';

import styles from './styles';

 export default function Gallery({ route, navigation }) {
    const [fls, setFls] = useState(route.params.files);
    const [modalImage, setModalImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    

    async function deleteFile(fl) {
        const new_fls = [];
        for(const f of fls) {
            if(f.path != fl.path) {
                new_fls.push(f);
            }
        }
        setFls(new_fls)
        route.params.setFiles(new_fls);
        setModalVisible(false);
    }

    async function setModal(visible, imageKey) {
        console.log('oi')
        setModalVisible(true);

        setModalImage(fls[imageKey]);
    }


    return (
        <View style={styles.container}>
            {fls.map((fl, key) => <TouchableOpacity  onPress={() => setModal(true, key)}><Image style={styles.imageWrap} source={{ uri: fl.path}} /></TouchableOpacity>)}
            {modalVisible == true &&
                <Modal style={styles.modal} animationType={'fade'} transparent={true} visible={modalVisible} onRequestClose={() => {}}>
                    <View style={styles.modal}>
                        <Text style={styles.text} onPress={() => setModalVisible(false)}>Fechar</Text>
                        <Image source={{ uri: modalImage.path }} style={styles.image}></Image>
                        <Text style={styles.text} onPress={() => deleteFile(modalImage)}>Excluir</Text>

                    </View>
                </Modal>
            }  
            
        </View>
    )
}