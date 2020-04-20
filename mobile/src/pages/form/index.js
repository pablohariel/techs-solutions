import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

// image picker expo
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// image picker react
import ImagePicker from 'react-native-image-crop-picker';

import api from '../../services/api';

import Logo from '../../assets/logo.png';
import cameraImg from '../../assets/buttons/media/camera_icon.png'
import videoImg from '../../assets/buttons/media/video_icon.png'
import styles from './styles';

export default function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [solutionName, setSolutionName] = useState('');
    const [imgs, setImgs] = useState([]);
    const [video, setVideo] = useState(null);
    const [sending, setSending] = useState(false);

    const navigation = useNavigation();

    async function navigateBack() {
        navigation.goBack();    
    }

    async function handleSend(event) {
        event.preventDefault();

        let data = {
            name,
            email,
            address,
            solutionName,
            imgs
        };

        const images = new FormData();

        imgs.forEach((img, i) => {
            const newFile = {
                uri: img.path,
                type: 'image/jpeg',
                name: solutionName,
                solutionName: solutionName
            }
            images.append('imgs', newFile);
        });

        // const videos = new FormData();
        // videos.append('video', {
        //     uri: video.path,
        //     type: 'video/mp4',
        //     name: solutionName
        // });

        const config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }
        }

        try {
            setSending(true);
            const responseImages = await api.post('images', images, config);
            // const responseVideo = await api.post('videos', videos, config);
            const responseSolutions = await api.post('solutions', data);
            setSending(false);
            alert('Enviado com sucesso.');
            setName('');
            setEmail('');
            setAddress('');
            setSolutionName('');
            setImgs([]);
            setVideo(null);
        } catch(err) {
            setSending(false);
            alert('Não foi possível enviar a solução, tente novamente.');
            console.log(err);
        }
    }

    // image picker
    useEffect(() => {
        getPermissionAsync();
    }, [0])

    async function getPermissionAsync() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };

    async function pickImage() {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                multiple: true
            }).then(images => {
                console.log(images);
                setImgs(images);
            });
        } catch (E) {
          console.log(E);
        }
    };

    async function pickVideo() {
        try {
            ImagePicker.openPicker({
                mediaType: "video",
            }).then(video => {
                console.log(video);
                setVideo({ uri: video.path, name: 'name_test', type: 'video/mp4' });
            });
        } catch (E) {
          console.log(E);
        }
    };

    function test() {
        let cont = 0;
        while(cont < 3) {
            return <Text>Oi</Text>
            cont++;
        }
    }

    return (
        <ScrollView  keyboardShouldPersistTaps="always">
                <View style={styles.backgroundImg}>
                    <View style={styles.header}>
                        <Image source={Logo} style={styles.logoImg} />
                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#8FB28A" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputs}>
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={name} placeholder="Nome" onChangeText={event => setName(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={email} placeholder="Email" onChangeText={event => setEmail(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={address} placeholder="Endereço" onChangeText={event => setAddress(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={solutionName} placeholder="Nome da solução" onChangeText={event => setSolutionName(event)} />
                    </View>
                    <View style={styles.mediaButtons}>
                        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                                <Image source={cameraImg} /> 
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
                                <Image source={videoImg} /> 
                        </TouchableOpacity> 
                    </View>

                     {/* sending animation */}
                    {sending && <LottieView
                        source={require("../../assets/lottie/green_preloader.json")}
                        loop
                        autoPlay
                    />}

                    {/* {sending && <LottieView
                        source={require("../../assets/lottie/black_preloader.json")}
                        loop
                        autoPlay
                    />} */}

                    {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}> */}
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            <Text style={{color: '#fff'}}>Enviar</Text>
                    </TouchableOpacity> 
                </View>
               

            {/* {sending === false ? (
                <View style={styles.backgroundImg}>
                    <View style={styles.header}>
                        <Image source={Logo} style={styles.logoImg} />
                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#8FB28A" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputs}>
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={name} placeholder="Nome" onChangeText={event => setName(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={email} placeholder="Email" onChangeText={event => setEmail(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={address} placeholder="Endereço" onChangeText={event => setAddress(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#8FB28A" value={solutionName} placeholder="Nome da solução" onChangeText={event => setSolutionName(event)} />
                    </View>
                    <View style={styles.mediaButtons}>
                        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                                <Image source={cameraImg} /> 
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
                                <Image source={videoImg} /> 
                        </TouchableOpacity> 
                    </View>

                    {/* {!sending && <LottieView
                        source={require("../../assets/lottie/blue_preloader.json")}
                        loop
                        autoPlay
                    />} */}

                    {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}> */}
                    {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            <Text style={{color: '#fff'}}>Enviar</Text>
                    </TouchableOpacity> 
                </View> */}
            {/* ) : ( <View style={styles.backgroundImg}>
                    <LottieView source={require("../../assets/lottie/blue_preloader.json")} loop autoPlay />
                </View> 
            )} */} 
            
        </ScrollView>
    );
}