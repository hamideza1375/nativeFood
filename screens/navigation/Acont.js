import React, { useEffect, useCallback } from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer , useFocusEffect} from "@react-navigation/native";
import Logout from "../user/Logout";
import Pardakht from "../food/Pardakht";
import Sms from "../food/Sms";
import Location from "../user/Location";
import Profile from "../user/Profile";



const HomeScreen = ({ navigation }) => {

 

    
  useFocusEffect(
    useCallback(() => {
        navigation.openDrawer()
    }, [])
  );




    return (
        <View>

        </View>
    )
}

const HomeScreen2 = ({ navigation }) => {
    return (
        <View>

        </View>
    )
}





const Drawer = createDrawerNavigator();
const Acont = () => {
    return (
        <Drawer.Navigator >
            {/* <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: "سفارشات فعال" }} /> */}
            <Drawer.Screen name="Pardakht" component={Pardakht} options={{ title: "لیست خرید ها" }} />
            <Drawer.Screen name="HomeScreen2" component={HomeScreen2} options={{ title: "تخفیفات" }} />
            <Drawer.Screen name="Location" component={Location} options={{ title: "Location " }} />
            <Drawer.Screen name="Sms" component={Sms} options={{ title: "  Sms" }} />
            <Drawer.Screen name="Logout" component={Logout} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
};

export default Acont;
