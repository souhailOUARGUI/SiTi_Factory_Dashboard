
import * as React from 'react';
import { Avatar, Button, Card, Text,Drawer,BottomNavigation } from 'react-native-paper';
import { useState } from 'react';
import { StyleSheet,  View,ImageBackground,SafeAreaView,Dimensions,Image,TouchableOpacity, } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Charttest from './charttest';

const MusicRoute = () => <Charttest/>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const TestPaper = () =>{
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'music', title: 'dashboard', focusedIcon: 'robot', unfocusedIcon: 'robot-outline'},
      { key: 'albums', title: 'Albums', focusedIcon: 'album' },
      { key: 'recents', title: 'Recents', focusedIcon: 'history' },
      
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      music: MusicRoute,
      albums: AlbumsRoute,
      recents: RecentsRoute,
      notifications: NotificationsRoute,
    });
  

    const [active, setActive] = useState('');
    return (
        
        <SafeAreaProvider>

      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
        </SafeAreaProvider>
      
    );
} 

export default TestPaper;