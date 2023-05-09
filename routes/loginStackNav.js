import { createStackNavigator } from "react-navigation-stack"; 

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import WelcomePage from "../screens/welcomePage";
import LoginPage from "../screens/login";
import MachineStats from "../screens/machineStats";
import NewLogin from "../screens/newLogin";
import Machine from "../screens/machine";
const screens = {
    //  NewLogin: {
    //     screen: NewLogin,
    //     navigationOptions: {
    //      headerShown:false,}
    // },
    MachineStats:{
        screen: MachineStats,
        navigationOptions:{
            title: 'Dashboards',
            
        }
    },Machine:{
        screen: Machine,
        navigationOptions:{}
    },
    /* ,WelcomePage:{
        screen: WelcomePage
    } */
}

const StackNavi = createStackNavigator(screens,{
    defaultNavigationOptions: {
        /* title: '', */
        headerTitleAlign : 'center',
        headerTitleStyle:{
            fontSize: 30,
            fontWeight: 'bold',
        },
        headerStyle: {
            backgroundColor: '#98DFAF',
            borderBottomStartRadius: 40,
            borderBottomEndRadius: 40,
            //a good looking shadow for the header
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 3,
            }   ,
            shadowOpacity: 0.29,
            shadowRadius: 5,
            elevation: 10,
            


            
        },
        

        
        
        
        /* cardStyle: {
            backgroundColor: 'blue'
        } */
        
    }
});

const LoginSwitchNav = createSwitchNavigator(
    {
      NewLogin: {
        screen: NewLogin,
        navigationOptions: {
          headerShown: false,
        },
      },
      Main: StackNavi,
    },
    {
      initialRouteName: 'NewLogin', // Set the initial route to the login screen
    },

  );



export default createAppContainer(LoginSwitchNav);