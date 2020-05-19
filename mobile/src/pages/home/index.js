import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';

import backgroundImg from '../../assets/home_background.png';
import formImg from '../../assets/buttons/form_icon.png';
import aboutUsImg from '../../assets/buttons/about_us_icon.png';
import infoImg from '../../assets/buttons/info_icon.png';
import contactImg from '../../assets/buttons/contact_icon.png';
import BurgerImg from '../../assets/Home/burger.png';
import Logo from '../../assets/Home/logo.png';
import VideoTutorial from '../../assets/videos/tutorial.mp4';

import styles from './styles';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
    const [modalFormVisible, setModalFormVisible] = useState(false);

    // video states
    const [repeat, setRepeat] = useState(true); 
    const [rate, setRate] = useState(1); 
    const [volume, setVolume] = useState(1); 
    const [muted, setMuted] = useState(false); 
    const [resizeMode, setResizeMode] = useState('contain');  // Video's mode: none, cover, stretch, contain
    const [duration, setDuration] = useState(0); 
    const [currentTime, setCurrentTime] = useState(0); 
    const [paused, setPaused] = useState(false); 
    const [rateText, setRateText] = useState('1'); 
    const [pausedText, setPausedText] = useState('Play'); 
    const [hideControls, setHideControls] = useState(false); 



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
                    <Text style={styles.buttonText}s>Enviar nova solução</Text>
                </TouchableOpacity>
                <Text style={styles.textVideoTutorial} onPress={() => setModalFormVisible(true)}>Tutorial para mandar solução</Text>
            </View>

            {/* video tutorial */}
            {modalFormVisible == true &&
                <Modal style={styles.mainModal} animationType={'fade'} transparent={true} visible={modalFormVisible} onRequestClose={() => {setModalFormVisible(false)}}>
                    <View style={styles.childModal}>
                        <View style={styles.modalButtons}>
                            <Text style={styles.modalButton} onPress={() => setModalFormVisible(false)}>Fechar</Text>
                        </View>
                            <TouchableWithoutFeedback onPress={() => setModalFormVisible(false) }>
                                <Video source={VideoTutorial}   // Can be a URL or a local file.     
                                    style={styles.videoTutorial}
                                    fullscreen={false}
                                    paused={paused}
                                    repeat={repeat}
                                    rate={rate}
                                    volume={volume}
                                    muted={muted}
                                    resizeMode={resizeMode}
                                />
                            </TouchableWithoutFeedback>   
                        </View>
                </Modal>
            }   
        </ImageBackground>
    );
}