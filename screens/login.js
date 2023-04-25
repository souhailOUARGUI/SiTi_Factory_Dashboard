import { StyleSheet, Text, View,ImageBackground,SafeAreaView,Dimensions,Image,
    TextInput,
    Pressable, } from 'react-native';
import React, { useState } from 'react';

import lstyles from './lstyles';
import Svg, {  Ellipse, ClipPath } from "react-native-svg";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
    runOnJS,
    withSequence,
    withSpring,
    log
  } from "react-native-reanimated";
  
const LoginPage = ({navigation}) => {

    const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const FirstloginHandler = () => {
    imagePosition.value = 0;
    /* if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    } */
    
  };
  
  const loginHandler = ()=> {
    
    formButtonScale.value = withSequence(withSpring(1.2), withSpring(1));
    navigation.navigate('WelcomePage');

  }

  return (
    <Animated.View style={lstyles.lcontainer}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            source={require("../assets/images/green_surface.jpg")}
            style={{
                width: width+100 ,height: height+100,
            }}

          />
        </Svg>
        <Animated.View
          style={[lstyles.lcloseButtonContainer, closeButtonContainerStyle]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={lstyles.lbottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={lstyles.lbutton} onPress={FirstloginHandler}>
            <Text style={lstyles.lbuttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        
        <Animated.View style={[lstyles.lformInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={lstyles.ltextInput}
          />
          
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={lstyles.ltextInput}
          />
          <Animated.View style={[lstyles.lformButton, formButtonAnimatedStyle]}>
            <Pressable onPress={ loginHandler}>
              <Text style={lstyles.lbuttonText}>
                LOG IN
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );


}





export default LoginPage;
