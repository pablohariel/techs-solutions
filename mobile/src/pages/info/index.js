import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview'

import backgroundImg from '../../assets/about_us/about_us_background.png'
import styles from './styles';

export default function Info() {
    return (
        <ImageBackground style={styles.container} source={backgroundImg}>

            <WebView 
                originWhitelist={['*']}
                style={styles.text}
                source={{
                    html:
                        "<style>p{, font-size: 20px}</style>" +
                        "<p style='text-align: justify; font-size: 50; line-height: 2;'>" +
                        "O aplicativo é basicamente uma plataforma que permite o agricultor tirar fotos e vídeos de suas soluções," + 
                        "além de informações adicionais e, enviar para o grupo de pesquisa.  Os mesmos vão ser analisados, pelos responsáveis técnicos, podendo somar em um site. " +
                        "O aplicativo surge a partir da pesquisa “Análise do papel dos agricultores na produção de soluções tecnológicas para a agricultura familiar”, é um projeto de" +
                        "extensão da UFRGS, desenvolvido em parceria com a UNISC, Escola Família Agrícola da Santa Cruz do Sul (EFASC), EMATER/ASCAR e AFUBRA. A criação deste aplicativo" + 
                        "advém da necessidade de articular a ação dos vários atores interessados em compreender, discutir e promover as soluções tecnológicas geradas na agricultura familiar."+
                        "O objetivo central deste projeto é engendrar uma organização em rede, que tenha como principal função a localização, discussão e promoção de soluções tecnológicas" + 
                        "desenvolvidas por atores da agricultura familiar, tais como agricultores, associações de agricultores, cooperativas, agentes de extensão rural, pequenas empresas voltadas à agricultura, etc." +
                        "</p>"
                }}
            />

        </ImageBackground> 
           
    );
}