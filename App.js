import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions } from 'react-native';
import WelcomePage from './screens/welcomePage';
import Navigator from './routes/homeStack';
import LoginPage from './screens/login';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <WelcomePage/> */}
      {/* <Navigator/> */}
      <LoginPage></LoginPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});