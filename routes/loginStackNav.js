import { createStackNavigator } from "react-navigation-stack"; 

import { createAppContainer } from 'react-navigation';
import WelcomePage from "../screens/welcomePage";
import LoginPage from "../screens/login";
import MachineStats from "../screens/machineStats";
const screens = {
    LoginPage : {
        screen: LoginPage,
        navigationOptions: {
         headerShown:false,}
    },WelcomePage:{
        screen: WelcomePage
    },MachineStats:{
        screen: MachineStats,
        navigationOptions:{}
    }, 
}



const LoginStackNav = createStackNavigator(screens,{
    defaultNavigationOptions: {
        /* title: '', */
        headerTitleAlign : 'center',
        headerTitleStyle:{
            fontSize: 30,
            fontWeight: 'bold'
        },
        headerStyle: {
            backgroundColor: '#fff',
        },
        
        /* cardStyle: {
            backgroundColor: 'blue'
        } */
        
    }
});


export default createAppContainer(LoginStackNav);