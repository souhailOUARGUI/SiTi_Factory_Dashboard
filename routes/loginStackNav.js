import { createStackNavigator } from 'react-navigation-stack'
import { Button,View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import WelcomePage from '../screens/welcomePage'
import LoginPage from '../screens/login'
import MachineStats from '../screens/machineStats'
import NewLogin from '../screens/newLogin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Machine from '../screens/machine'



//    **********logout handler function**********
const logoutHandler = (navigation) => {
  // remove the token from the storage  
  try {
    AsyncStorage.removeItem('token')
    console.log('token removed');
    navigation.navigate('NewLogin');
    
  } catch (error) {
    console.log('error removing token from AS',error);
  }
}
const screens = {
  //  NewLogin: {
  //     screen: NewLogin,
  //     navigationOptions: {
  //      headerShown:false,}
  // },
  MachineStats: {
    screen: MachineStats,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboards',
      // add a logout button to the header and add right margin to it
      headerRight: () => (
        // logout Icon
        <View style={{ marginRight: 10 }}>

          <Icon.Button
            name='sign-out' 
            size={25}
            backgroundColor='#98DFAF'
            onPress={() => {  
              logoutHandler(navigation);
            } }
          />
        </View>
      ),
      headerRightContainerStyle: {
        marginRight: 20,
      },
      
    }),
  },
  Machine: {
    screen: Machine,
    navigationOptions: {
      headerShown: false,
    },
  },
  /* ,WelcomePage:{
        screen: WelcomePage
    } */
}

const StackNavi = createStackNavigator(screens, {
  defaultNavigationOptions: {
    /* title: '', */
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      // black shadow for the header title
      // textShadowColor: 'rgba(0, 0, 0, 0.60)',textShadowOffset: {width: -1, height: 1},
      // textShadowRadius: 5,
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
      },
      shadowOpacity: 0.29,
      shadowRadius: 5,
      elevation: 10,
    },

    /* cardStyle: {
            backgroundColor: 'blue'
        } */
  },
})

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
)

export default createAppContainer(LoginSwitchNav)
