import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Home from './pages/home';
import Form from './pages/form';
import Contact from './pages/contact';
import Info from './pages/info';
import AboutUs from './pages/about_us';
import Gallery from './pages/form/gallery';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Form" component={Form} />
                <AppStack.Screen name="Contact" component={Contact} />
                <AppStack.Screen name="Info" component={Info} />
                <AppStack.Screen name="AboutUs" component={AboutUs} />
                <AppStack.Screen name="Gallery" component={Gallery} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}