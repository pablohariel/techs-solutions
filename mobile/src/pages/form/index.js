import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

// react native paper
// import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

// image picker expo
import Constants from 'expo-constants';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import * as Permissions from 'expo-permissions';

// image picker react
import ImagePicker from 'react-native-image-crop-picker';

import api from '../../services/api';

import Gallery from './gallery';
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
    const [vds, setVds] = useState([]);
    const [coordinate, setCoordinate] = useState('')
    const [sending, setSending] = useState(false);

    const navigation = useNavigation();

    async function navigateBack() {
        navigation.goBack();  
    }

    async function handleSend(event) {
        event.preventDefault();

        const { granted } = await requestPermissionsAsync();
        
        if(granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true
            });
            setCoordinate(coords);
        } 
        console.log(coordinate);
        if(!solutionName) {
            alert('Nome da solução não inserido!');
            return;
        }

        if(imgs.length < 1) {
            alert('Nenhuma foto selecionada!');
            return;
        }

        if(vds.length < 1) {
            alert('Nenhum video selecionado!');
            return;
        }

        let data = {
            name,
            email,
            address,
            solutionName,
            imgs,
            coordinate
        };

        const videos = new FormData();
        vds.forEach((vd, i) => {
            const newFile = {
                uri: vd.path,
                type: 'video/mp4',
                name: solutionName,
                solutionName: solutionName
            }
            videos.append('files', newFile);
        });

        const images = new FormData();

        imgs.forEach((img, i) => {
            const newFile = {
                uri: img.path,
                type: 'image/jpeg',
                name: solutionName,
                solutionName: solutionName
            }
            images.append('files', newFile);
        });

        const config = {
            headers: {
              Accept: 'application/json',   
              'Content-Type': 'multipart/form-data',
            }
        }

        try {
            setSending(true);
            const responseVideos = await api.post('solutions', videos, config);
            const responseImages = await api.post('solutions', images, config);

            const imgs_files = [];
            for(const file of responseImages.data.data) {
                console.log(file.url);
                imgs_files.push(file);
            }

            data.imgs = imgs_files;

            const videos_files = [];
            for(const file of responseVideos.data.data) {
                console.log(file.url);
                videos_files.push(file);
            }

            data.videos = videos_files;

            const responseSolutions = await api.post('solutions', data);
            setSending(false);
            console.log('Response: ' + responseSolutions);
            alert('Enviado com sucesso.');
            setName('');
            setEmail('');
            setAddress('');
            setSolutionName('');
            setImgs([]);
            setVds([]);
            
        } catch(err) {

            setSending(false);
            alert('Não foi possível enviar a solução, tente novamente.');
            console.log(err);
        }
    }

    // image picker
    useEffect(() => {
        getPermissionAsync();
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
    }, [0])

    async function getPermissionAsync() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };

    async function pickImageCamera() {
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
            }).then(image => {
                if(imgs.length > 0) {
                    const final_array = imgs.concat([image]);
                    setImgs(final_array);
                } else {
                    setImgs([image]);
                }
            });
        } catch (E) {
          console.log(E);
        }
    };

    async function pickImageGallery() {
        var invalidFile = false;
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                multiple: true
            }).then(images => {
                images.map(image => {
                    if(image.mime !== 'image/jpeg') {
                        invalidFile = true;
                    }
                });
                if(!invalidFile == true) {
                    if(imgs.length > 0) {
                        const final_array = imgs.concat(images);
                        setImgs(final_array);
                    } else {
                        setImgs(images);
                    }
                } else {
                    setImgs([]);
                    alert('Arquivo selecionado invalido!');
                }
            });
        } catch (E) {
          console.log(E);
        }
    };

    async function pickVideoCamera() {
        try {
            ImagePicker.openCamera({
                mediaType: 'video'
            }).then(video => {
                if(vds.length > 0) {
                    const final_array = vds.concat([video]);
                    setVds(final_array);
                } else {
                    setVds([video]);
                }
            });
        } catch (E) {
          console.log(E);
        }
    };

    async function pickVideoGallery() {
        var invalidFile = false;
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                multiple: true
            }).then(videos => {
                videos.map(video => {
                    if(video.mime !== 'video/mp4') {
                        invalidFile = true;
                    }
                });
                if(!invalidFile == true) {
                    // console.log(videos);
                    if(vds.length > 0) {
                        const final_array = vds.concat(videos);
                        console.log(final_array);
                        setVds(final_array);
                    } else {
                        setVds(videos);
                    }
                    
                } else {
                    setVds([]);
                    alert('Arquivo selecionado invalido!');
                }
            });
        } catch (E) {
          console.log(E);
        }
    };

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
                        <TouchableOpacity style={styles.mediaButton} onPress={() => Alert.alert(
                            "Alert title",
                            "",
                            [
                                {
                                    text: "Selecionar da galeria",
                                    onPress: pickImageGallery
                                },
                                {
                                    text: "Tira foto",
                                    onPress: pickImageCamera
                                }
                            ],
                            { cancelable: true }
                        )}>
                            <Image source={cameraImg} /> 
                        </TouchableOpacity> 
                        {imgs.length > 0 && <TouchableOpacity onPress={() => navigation.navigate('Gallery', {'files': imgs, 'setFiles': setImgs})}><Text>ver imagens</Text></TouchableOpacity>}
                        <TouchableOpacity style={styles.mediaButton} onPress={() => Alert.alert(
                            "Alert title",
                            "",
                            [
                                {
                                    text: "Selecionar da galeria",
                                    onPress: pickVideoGallery
                                },
                                {
                                    text: "Gravar video",
                                    onPress: pickVideoCamera
                                }
                            ],
                            { cancelable: true }
                        )}>
                            <Image source={videoImg} /> 
                        </TouchableOpacity> 
                        {vds.length > 0 && <TouchableOpacity onPress={() => navigation.navigate('Gallery', {'files': vds, 'setFiles': setVds})}><Text>ver videos</Text></TouchableOpacity>}

                    </View>

                     {/* sending animation */}
                    {sending && <LottieView
                        source={require("../../assets/lottie/green_preloader.json")}
                        loop
                        autoPlay
                    />}

                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                            <Text style={{color: '#fff'}}>Enviar</Text>
                    </TouchableOpacity> 
                </View>   
        </ScrollView>
    );
}