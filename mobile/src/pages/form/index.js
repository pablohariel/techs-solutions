import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, PermissionsAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

// react native paper
// import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';

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
    const [showAlert, setShowAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const [imageAlert, setImageAlert] = useState(false);
    const [videoAlert, setVideoAlert] = useState(false);

    const [sending, setSending] = useState(false);

    const navigation = useNavigation();

    async function navigateBack() {
        navigation.goBack();  
    }

    async function handleSend(event) {
        event.preventDefault();

        setShowAlert(false);

        const { granted } = await requestPermissionsAsync();
        
        if(granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true
            });
            setCoordinate(coords);
        } 
        console.log(coordinate);
        if(!solutionName || !name || !email || !address) {
            setErrAlert(true);
            return;
        }

        if(imgs.length < 1) {
            setErrAlert(true);
            return;
        }

        if(vds.length < 1) {
            setErrAlert(true);
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
            setSuccessAlert(true);
            setName('');
            setEmail('');
            setAddress('');
            setSolutionName('');
            setImgs([]);
            setVds([]);
            
        } catch(err) {
            setSending(false);
            setErrAlert(true);
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

    async function handleMediaSelected(mediaType, option) {
        if(mediaType == 'image') {
            setImageAlert(false);
            if(option == 'gallery') {
                pickImageGallery();
            }
            if(option == 'camera') {
                pickImageCamera();
            }
        }

        if(mediaType == 'video') {
            setVideoAlert(false);
            if(option == 'gallery') {
                pickVideoGallery();
            }
            if(option == 'camera') {
                pickVideoCamera();
            }
        }
    }

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
        setImageAlert(false);
        var invalidFile = false;
        try {
            ImagePicker.openPicker({
                width: 1000,
                height: 1000,
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
        setVideoAlert(false);
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
                    setVideoAlert(false)
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

                    {/* alert */}
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Enviar solução?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Não, cancelar"
                        confirmText="Sim, enviar"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                        onConfirmPressed={handleSend}
                        onDismiss={() => {
                            setShowAlert(false);
                        }}
                    />

                    {/* sending alert */}
                    <AwesomeAlert
                        show={sending}
                        showProgress={true}
                        title="Enviando..."
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        cancelText="Não, cancelar"
                        confirmText="Sim, enviar"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                        onConfirmPressed={handleSend}
                        
                    />

                    {/* error alert */}
                    <AwesomeAlert
                        show={errAlert}
                        showProgress={false}
                        title="Não foi possível enviar a solução"
                        message="Revise os dados e tente novamente"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Cancelar"
                        confirmText="Revisar"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => {
                            setErrAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setErrAlert(false);
                        }}
                        onDismiss={() => {
                            setErrAlert(false);
                        }}
                    />

                    {/* success alert */}
                    <AwesomeAlert
                        show={successAlert}
                        showProgress={false}
                        title="Solução enviada com sucesso!"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        cancelText="Cancelar"
                        confirmText="Fechar"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => {
                            setErrAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setSuccessAlert(false);
                        }}
                        onDismiss={() => {
                            setSuccessAlert(false);
                        }}
                    />

                    {/* image alert */}
                    <AwesomeAlert
                        show={imageAlert}
                        showProgress={false}
                        title="Selecionar imagem"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Galeria"
                        confirmText="Camera"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => handleMediaSelected('image', 'gallery')}
                        onConfirmPressed={() => handleMediaSelected('image', 'camera')}
                        onDismiss={() => {
                            setImageAlert(false);
                        }}
                    />

                    {/* video alert */}
                    <AwesomeAlert
                        show={videoAlert}
                        showProgress={false}
                        title="Selecionar video"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Galeria"
                        confirmText="Camera"
                        confirmButtonColor="#8FB28A"
                        onCancelPressed={() => handleMediaSelected('video', 'gallery')}
                        onConfirmPressed={() => handleMediaSelected('video', 'camera')}
                        onDismiss={() => {
                            setVideoAlert(false);
                        }}
                    />

                    <View style={styles.mediaButtons}>
                        <View style={styles.mediaButtonGroup}>
                            {imgs.length > 0 ? ( <TouchableOpacity onPress={() => navigation.navigate('Gallery', {'files': imgs, 'setFiles': setImgs})}><Text>ver</Text></TouchableOpacity>) : (<Text></Text>)}
                            <TouchableOpacity style={styles.mediaButton} onPress={() => setImageAlert(true)}>
                                <Image source={cameraImg} /> 
                            </TouchableOpacity> 
                        </View>
                        
                        <View style={styles.mediaButtonGroup}>
                            <TouchableOpacity style={styles.mediaButton} onPress={() => setVideoAlert(true)}>
                                <Image source={videoImg} /> 
                            </TouchableOpacity> 
                            {vds.length > 0 ? (<TouchableOpacity onPress={() => navigation.navigate('Gallery', {'files': vds, 'setFiles': setVds})}><Text>ver</Text></TouchableOpacity>) : (<Text></Text>)}
                        </View>
                       

                    </View>

                     {/* sending animation */}
                    {/* {sending && <LottieView
                        source={require("../../assets/lottie/green_preloader.json")}
                        loop
                        autoPlay
                    />} */}

                    {/* <TouchableOpacity style={styles.sendButton} onPress={handleSend}> */}
                    <TouchableOpacity style={styles.sendButton} onPress={() => setShowAlert(true)}>
                            <Text style={{color: '#fff'}}>Enviar</Text>
                    </TouchableOpacity> 
                </View>   
        </ScrollView>
    );
}