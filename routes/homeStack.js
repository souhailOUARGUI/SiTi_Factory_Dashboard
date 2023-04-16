import { createStackNavigator } from "react-navigation-stack"; 

import { createAppContainer } from 'react-navigation';
import WelcomePage from "../screens/welcomePage";
import LoginPage from "../screens/login";
import RevPage from "../screens/revPage";
const screens = {
    WelcomePage : {
        screen: WelcomePage,
        navigationOptions: {
         title:'SitiTea',
         
        }
    },LoginPage:{
        screen: LoginPage
    },/* RevPage:{
        screen: RevPage
    }
 */    
}


const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions: {
        /* title: '', */
        headerStyle: {
            backgroundColor: '#fff',
            
            
        },
        /* cardStyle: {
            backgroundColor: 'blue'
        } */
        
    }
});


export default createAppContainer(HomeStack);