import { createStackNavigator } from "react-navigation-stack"; 

import { createAppContainer } from 'react-navigation';
import WelcomePage from "../screens/welcomePage";
import LoginPage from "../screens/login";
import MachineStats from "../screens/machineStats";
import NewLogin from "../screens/newLogin";
import Machine from "../screens/machine";
const screens = {
     NewLogin: {
        screen: NewLogin,
        navigationOptions: {
         headerShown:false,}
    },MachineStats:{
        screen: MachineStats,
        navigationOptions:{}
    },Machine:{
        screen: Machine,
        navigationOptions:{}
    },
    /* ,WelcomePage:{
        screen: WelcomePage
    } */
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