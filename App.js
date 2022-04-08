import React, { useState, useEffect } from "react";
import { View, Button } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Food from "./screens/food/Food";
import SinglePiza from "./screens/food/SinglePiza";
import ForgetPass from "./screens/user/ForgetPass";
import ResetPass from "./screens/user/ResetPass";
import Payment from "./screens/user/Payment";
import First from "./screens/navigation/First";


const Tab = createNativeStackNavigator()


const App = () => {

  useEffect(() => {
    console.disableYellowBox = true
  }, [])


  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerBackTitle: "<", }} >
        <Tab.Screen name="First" component={First} options={{ headerShown: false }} />
        <Tab.Screen name="food" component={Food} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="SinglePiza" component={SinglePiza} />
        <Tab.Screen name="ForgetPass" component={ForgetPass} options={({ route }) => ({ title: ' فراموشی رمزعبور' })} />
        <Tab.Screen name="ResetPass" component={ResetPass} options={({ route }) => ({ title: ' تعویض رمزعبور' })} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}





export default App;

