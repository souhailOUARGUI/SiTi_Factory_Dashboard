import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions } from 'react-native';
import WelcomePage from './screens/welcomePage';
import Navigator from './routes/loginStackNav';
import LoginPage from './screens/login';
import ChartTest from './screens/charts/charttest';
import TestPaper from './screens/charts/testPaper';
import NewLogin from './screens/newLogin';
import MachineStats from './screens/machineStats';
import Machine from './screens/machine';
export  default function App() {
  return (
    <View style={styles.container}>
      {/* <WelcomePage/> */}
      <Navigator/>
      {/* <ChartTest/> */}
      {/* <LoginPage/> */}
      {/* <MachineStats/> */}
      {/* <NewLogin/> */}
      {/* <Machine/> */}

      
    </View>
  );
}

 






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});