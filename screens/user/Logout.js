import React, { useEffect } from "react";
import { View } from 'react-native';
import localStorage from "@react-native-async-storage/async-storage"


const Logout = ({ navigation }) => {

    useEffect(() => {
        (async () => {
            await localStorage.removeItem("token");
            navigation.navigate("Home");
        })()
    }, []);

    return <View />;
};

export default Logout;
