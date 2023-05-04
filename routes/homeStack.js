import { createStackNavigator } from "react-navigation-stack"; 

import { createAppContainer } from 'react-navigation';
import WelcomePage from "../screens/welcomePage";
import MachineStats from "../screens/machineStats";
const screens = {
    WelcomePage : {
        screen: WelcomePage,
        navigationOptions: {
         title:'SitiTea',
         
        
         
        }
    },MachineStats:{
        screen: MachineStats,
        navigationOptions:{}
    }, 
}



const HomeStack = createStackNavigator(screens,{
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


export default createAppContainer(HomeStack);