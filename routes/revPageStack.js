import { createStackNavigator } from "react-navigation-stack"; 

import RevPage from "../screens/revPage";
const screens = {
    RevPage : {
        screen: RevPage,
        navigationOptions: {
         title:'SitiTea',
         
        }
    }
    
}


const RevStack = createStackNavigator(screens,{
    defaultNavigationOptions: {
        /* title: '', */
        headerStyle: {
            backgroundColor: '#fff'
        },
        /* cardStyle: {
            backgroundColor: 'blue'
        } */
        
    }
});


export default RevStack;