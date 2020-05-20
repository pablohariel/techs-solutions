import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, PermissionsAndroid, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { WebView } from 'react-native-webview';

import HeaderComponent from '../header';

// react native paper
import AwesomeAlert from 'react-native-awesome-alerts';

// image picker expo
import Constants from 'expo-constants';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import * as Permissions from 'expo-permissions';

// image picker react
import ImagePicker from 'react-native-image-crop-picker';

import api from '../../services/api';

import Logo from '../../assets/logo.png';
import cameraImg from '../../assets/buttons/media/camera_icon.png'
import videoImg from '../../assets/buttons/media/video_icon.png'
import styles from './styles';
import backgroundImg from '../../assets/about_us/about_us_background.png'
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [solutionName, setSolutionName] = useState('');
    const [findedProblem, setFindedProblem] = useState('');
    const [imgs, setImgs] = useState([]);
    const [vds, setVds] = useState([]);
    const [coordinate, setCoordinate] = useState('');
    const [termsBoxChecked, setTermsBoxChecked] = useState(false);
    const [forceDisable, setForceDisable] = useState(false);

    const [modalFormVisible, setModalFormVisible] = useState(false);

    // alerts
    const [showAlert, setShowAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [imageAlert, setImageAlert] = useState(false);
    const [videoAlert, setVideoAlert] = useState(false);
    const [invalidFileAlert, setInvalidFileAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertOpened, setAlertOpened] = useState(false);
    const [checkboxAlert, setCheckboxAlert] = useState(false);

    const [sending, setSending] = useState(false);

    const navigation = useNavigation();

    async function navigateBack() {
        navigation.goBack();  
    }

    async function handleSend(event) {
        event.preventDefault();

        setShowAlert(false);

        if(!termsBoxChecked) {
            setAlertOpened(true);
            setCheckboxAlert(true);
            return;
        }

        const { granted } = await requestPermissionsAsync();
        
        if(granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true
            });
            setCoordinate(coords);
        } 

        if(!solutionName || !name || !email || !address || !findedProblem) {
            setAlertOpened(true);
            setErrAlert(true);
            return;
        }

        if(imgs.length < 1) {
            setAlertOpened(true);
            setErrAlert(true);
            return;
        }

        if(vds.length < 1) {
            setAlertOpened(true);
            setErrAlert(true);
            return;
        }

        let data = {
            name,
            email,
            address,
            solutionName,
            imgs,
            coordinate,
            findedProblem
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
            setAlertOpened(true)
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
            setAlertOpened(false);
            console.log('Response: ' + responseSolutions);

            setSuccessAlert(true);
            setAlertOpened(true);
            setName('');
            setEmail('');
            setAddress('');
            setSolutionName('');
            setFindedProblem('');
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
        console.log(videoAlert);
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
        console.log(videoAlert);
        if(mediaType == 'image') {
            if(option == 'gallery') {
                await pickImageGallery();
            }
            if(option == 'camera') {
                await pickImageCamera();
            }
        }

        if(mediaType == 'video') {
            if(option == 'gallery') {
                await pickVideoGallery();
            }
            if(option == 'camera') {
                await pickVideoCamera();
            }
        }
    }

    async function pickImageCamera() {
        try {
            await ImagePicker.openCamera({
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
        setImageAlert(false);
    };

    async function pickImageGallery() {
        var invalidFile = false;
        try {
            await ImagePicker.openPicker({
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
                        setAlertOpened(true);
                        setImgs(images);
                    }
                } else {
                    setAlertOpened(true);
                    setInvalidFileAlert(true);
                }
            });
        } catch (E) {
          console.log(E);
        }
        setImageAlert(false);

    };

    async function pickVideoCamera() {
        try {
            await ImagePicker.openCamera({
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
        setVideoAlert(false);
    };

    async function pickVideoGallery() {
        var invalidFile = false;
        try {
            await ImagePicker.openPicker({
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
                    if(vds.length > 0) {
                        const final_array = vds.concat(videos);
                        console.log(final_array);
                        setVds(final_array);
                    } else {
                        setAlertOpened(true);
                        setVds(videos);
                    }
                    
                } else {
                    setAlertOpened(true);
                    setInvalidFileAlert(true);
                    // setAlertOpened(true);
                    // setErrorMessage('Arquivo invalido')
                }
                setVideoAlert(false);
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
                            <Feather name="arrow-left" size={28} color="#6FCF97" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputs}>
                        <TextInput style={styles.textInput} placeholderTextColor="#747D88" value={name} placeholder="Nome" onChangeText={event => setName(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#747D88" value={email} placeholder="Email" onChangeText={event => setEmail(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#747D88" value={address} placeholder="Endereço" onChangeText={event => setAddress(event)} />
                        <TextInput style={styles.textInput} placeholderTextColor="#747D88" value={solutionName} placeholder="Nome da solução" onChangeText={event => setSolutionName(event)} />
                        <TextInput style={styles.textInput} autoComplete="false" placeholderTextColor="#747D88" value={findedProblem} placeholder="Problema encontrado anteriormente" onChangeText={event => setFindedProblem(event)} />
                        <View style={styles.termsView}>
                            <CheckBox
                                disabled={alertOpened}
                                title='Aceito os termos de uso.'
                                containerStyle={styles.checkbox}
                                fontFamily='roboto'
                                textStyle={styles.checkboxText}
                                checkedColor='#6FCF97'
                                checked={termsBoxChecked}
                                onPress={() => setTermsBoxChecked(!termsBoxChecked)}
                            />
                            <Text style={styles.checkboxLink} onPress={() => setModalFormVisible(true)} disabled={alertOpened}>Ler termos</Text>
                        </View>
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
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                        onConfirmPressed={handleSend}
                        onDismiss={() => {
                            setAlertOpened(false)
                            setShowAlert(false);
                        }}
                    />

                    {/* checkbox alert */}
                    <AwesomeAlert
                        show={checkboxAlert}
                        showProgress={false}
                        title="Aceite os termos de uso antes de continuar"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        confirmButtonColor="#6FCF97"
                        onDismiss={() => {
                            setCheckboxAlert(false);
                            setAlertOpened(false);

                        }}
                    />

                    {/* file invalid alert */}
                    <AwesomeAlert
                        show={invalidFileAlert}
                        showProgress={false}
                        title="Arquivo selecionado inválido!"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        confirmButtonColor="#6FCF97"
                        onDismiss={() => {
                            setAlertOpened(false)
                            setInvalidFileAlert(false)
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
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => {
                            setShowAlert(false);
                        }}
                        onConfirmPressed={handleSend}
                        onDismiss={() => {
                            setAlertOpened(false)
                        }}
                        
                    />


                    {/* error alert */}
                    <AwesomeAlert
                        show={errAlert}
                        showProgress={false}
                        title="Não foi possível enviar a solução"
                        message="Revise os dados e tente novamente"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={false}
                        cancelText="Cancelar"
                        confirmText="Revisar"
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => {
                            setErrAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setErrAlert(false);
                        }}
                        onDismiss={() => {
                            setAlertOpened(false)
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
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => {
                            setErrAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setAlertOpened(false)
                            setSuccessAlert(false);
                        }}
                        onDismiss={() => {
                            setAlertOpened(false)
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
                        confirmText="Câmera"
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => handleMediaSelected('image', 'gallery')}
                        onConfirmPressed={() => handleMediaSelected('image', 'camera')}
                        onDismiss={() => {
                            setAlertOpened(false)
                            setImageAlert(false);
                        }}
                    />

                    {/* video alert */}
                    <AwesomeAlert
                        show={videoAlert}
                        showProgress={false}
                        title="Selecionar vídeo"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Galeria"
                        confirmText="Câmera"
                        confirmButtonColor="#6FCF97"
                        onCancelPressed={() => { 
                            handleMediaSelected('video', 'gallery')
                        }}
                        onConfirmPressed={() => handleMediaSelected('video', 'camera')}
                        onDismiss={() => {
                            setAlertOpened(false)
                            setVideoAlert(false)
                        }}
                    />

                    <View style={styles.mediaButtons}>
                        <View style={styles.mediaButtonGroup}>
                            <TouchableOpacity style={styles.mediaButton} disabled={alertOpened} onPress={() => {
                                setAlertOpened(true)
                                setImageAlert(true)
                            }}>
                                <Image style={styles.cameraButton} source={cameraImg} /> 
                            </TouchableOpacity> 
                            {imgs.length > 0 ? (<TouchableOpacity  style={styles.galleryLink} onPress={() => navigation.navigate('Galeria', {'files': imgs, 'setFiles': setImgs})}><Text>ver imagens</Text></TouchableOpacity>) : (<Text style={styles.galleryLink}></Text>)}
                        </View>
                        
                        <View style={styles.mediaButtonGroup}>
                            <TouchableOpacity style={styles.mediaButton} disabled={alertOpened} onPress={() => {
                                setVideoAlert(true)
                                setAlertOpened(true)
                            }}>
                                <Image style={styles.videoButton} source={videoImg} /> 
                            </TouchableOpacity> 
                            {vds.length > 0 ? (<TouchableOpacity style={styles.galleryLink} onPress={() => navigation.navigate('Galeria', {'files': vds, 'setFiles': setVds})}><Text>ver videos</Text></TouchableOpacity>) : (<Text style={styles.galleryLink}></Text>)}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.sendButton} disabled={alertOpened} onPress={() => {
                        setAlertOpened(true)
                        setShowAlert(true)
                    }}>
                            <Text style={{color: '#fff'}}>Enviar</Text>
                    </TouchableOpacity> 
                </View>   

                {/* termos de uso */}
                {modalFormVisible == true &&
                    <Modal style={styles.modal} animationType={'fade'} transparent={true} visible={modalFormVisible} onRequestClose={() => {}}>
                        <View style={styles.modal}>
                            <View style={styles.buttons}>
                                <Text style={styles.modalButton} onPress={() => setModalFormVisible(false)}>Fechar</Text>
                            </View>
                            <ScrollView style={styles.modalScroll}>
                                <WebView 
                                    originWhitelist={['*']}
                                    style={styles.modalText}
                                    source={{
                                        html:
                                            "<style>p{, font-size: 50px}</style>" +
                                            "<p style='text-align: justify; font-size: 50; line-height: 2; padding: 40;'>" +
                                            "Autorizo o uso dos dados no projeto 'Observatório de soluções tecnológicas da Agricultura Familiar', sejam esses destinados à divulgação ao público e/ou apenas para uso interno." +
                                            "</p>"
                                    }}
                                />
                            </ScrollView>
                        </View>
                    </Modal>
                }  
        </ScrollView>
    );
}