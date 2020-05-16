import React from 'react';
import { NavigationContainer, createNavigatorFactory } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const AppStack = createStackNavigator();

import Home from './pages/home';
import Form from './pages/form';
import Contact from './pages/contact';
import Info from './pages/info';
import AboutUs from './pages/about_us';
import Gallery from './pages/form/gallery';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyTheme = {
    dark: true,
    colors: {
      primary: '#6FCF97',
      background: '#000',
      card: '#fff',
      text: '#6FCF97',
      border: '#000'
    },
  };

function Root() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="Form" component={Form} options={{headerShown: false}} />
            <Stack.Screen name="Galeria" component={Gallery} />
            <Stack.Screen name="Info" component={Info} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Root} />
                <Drawer.Screen name="Contato" component={Contact} />
                <Drawer.Screen name="Sobre nós" component={AboutUs} />
            </Drawer.Navigator> 
        </NavigationContainer>
    );
}
