import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import localStorage from "@react-native-async-storage/async-storage"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Home from "./Home";
import Acont from "./Acont";
import Login from "../user/Login";
import Register from "../user/Register";



const BottomTab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()






const Users2 = () => {
  return (
    <TopTab.Navigator initialRouteName="Login" >
      <TopTab.Screen name="Register" component={Register} options={{ tabBarLabel: "ثبت نام", }} />
      <TopTab.Screen name="Login" component={Login} options={{ tabBarLabel: "ورود" }} />
    </TopTab.Navigator>
  )

}





const First = () => {

  const [token1, setToken1] = useState(false)


  const aa = (async () => {
    let tok = await localStorage.getItem("token")
    setToken1(tok);
    if (tok) {
      const users = jwt.decode(token1, { complete: true });
      // if (users.payload.exp < Date.now() / 1000){
      //   await localStorage.removeItem("token");
      //   setToken1(false)
      // }
    }
  })
  aa()




  const sum2 = (route) => ({
    title: "پروفایل",
    tabBarShowLabel: false,
    headerTintColor: '#555', headerStyle: { backgroundColor: '#f5f5f5' },
    tabBarStyle: { backgroundColor: '#f5f5f5', height: "10%" },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === "Home") { iconName = focused ? "envelope" : "envelope-open" }
      else { iconName = focused ? "user" : "address-card" }
      return (
        <Icon name={iconName} size={size - 5} color={color} style={{ padding: 11 }} />);
    }
  })




  return (

    <BottomTab.Navigator screenOptions={({ route }) => sum2(route)}>
      <BottomTab.Screen name="Home" component={Home} options={{ tabBarItemStyle: { color: "red", tabBarStyle: { backgroundColor: "red" } }, title: 'خانه' }} />
      <BottomTab.Screen name="Users" component={token1 ? Acont : Users2}
        options={token1 ? { title: "پروفایل", headerShown:false } : { title: "ورود/ثبت نام" }} />
{/* headerTitleStyle: { fontWeight: '100' }  */}
    </BottomTab.Navigator>
  )

}



export default First;