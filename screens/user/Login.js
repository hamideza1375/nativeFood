import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Image, Button, Keyboard, RefreshControl, ScrollView } from "react-native";
import { Formik } from 'formik';

import * as Yup from "yup";
import Styles from "../../styles/Styles";
import { loginUser } from '../../services/userService';
import localStorage from "@react-native-async-storage/async-storage"
// import { JwtDecode } from './JwtDecode';

import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';





const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  password: Yup.string()
    .required("این فیلد الزامی می باشد")
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد"),
});





const useForceUpdate = () => {
  const set = useState(0)[1];
  return () => set((s) => s + 1);
};




// medialibrary

const Login = ({ navigation, route }) => {


  // const [refreshing, setRefreshing] = React.useState(false);
  const [secure, setSecure] = useState(true)
  const [remember1, setRemember1] = useState("1h");

  const [captcha, setCaptcha] = useState("");
  const [rand, setRand] = useState(9999);
  const [show, setShow] = useState(9999);


  useEffect(() => {
    setRand(parseInt(Math.random() * rand + 1000))
  }, [show])



  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false)
  //   }, 2000);

  // }, []);



  // setRefreshing(true);setTimeout(() => {setRefreshing(false);}, 2000);


  const forceUpdate = useForceUpdate();


  return (
    <Formik initialValues={{ email: "", password: "", remember: "" }}
      onSubmit={async (values) => {
        const { status, data } = await loginUser({ email: values.email, password: values.password, remember: remember1, captcha });
        if (status == 200) {
          await localStorage.setItem("token", data.token);
          forceUpdate()
          navigation.navigate("Users")
        } else { alert("khata") }
      }}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <View style={{ marginTop: 15, flex: 1 }} >


          {/* <ScrollView
        contentContainerStyle={{padding:0,margin:0}}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
      </ScrollView> */}

          {/*  */}

          <View style={Styles.Rcontainer}>
            <TextInput
              autoCapitalize='none'
              placeholder="ایمیل کاربری"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={() => setFieldTouched("email")}
            />
            <Icon name="envelope" size={30} color="#555" style={Styles.Ricon} />
          </View>

          {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}




          <View style={Styles.Rcontainer}>
            <TextInput
              autoCapitalize='none'
              placeholder="کلمه عبور"
              autoCompleteType="password"
              autoCorrect={false}
              style={Styles.RtextInput}
              placeholderTextColor="royalblue"
              secureTextEntry={secure}
              onChangeText={handleChange("password")}
              value={values.password}
              onBlur={() => setFieldTouched("password")}
            />
            <Icon onPress={() => { setSecure(!secure); }} name={!secure ? "eye" : "eye-slash"} size={30} color="#555" backgroundColor='blue' style={Styles.Ricon} />
          </View>
          {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TextInput placeholder="کد امنیتی" autoCompleteType="number" style={{ marginRight:-117,borderRadius: 2,marginTop: 26, marginLeft: "auto",textAlign:'right', padding:7,width: 85, height: 37, borderWidth: 1 }} value={captcha} onChangeText={text => setCaptcha(text)} />
            <Icon name="refresh" color="#333399f0" size={22} onPress={()=>setShow(!show)} style={{marginLeft: 'auto',marginRight:-120, marginTop:35}} />
            <Image source={{ uri: `http://localhost:80/captcha.png/${rand}` }} style={{ borderRadius: 2, padding: 5, backgroundColor: "#412", marginLeft: "auto", marginRight: 31, marginTop: 25, width: 105, height: 39 }} />
          </View>

          <View style={{
            flexDirection: 'row', marginRight: 10, marginTop: 30,
            justifyContent: 'flex-end'
          }}>
            <Text style={{ fontSize: 19, marginRight: 5 }}>مرا بخاطر بسپر</Text>
            <TextInput
              autoCompleteType="password"
              onFocus={() => { Keyboard.dismiss(); remember1 == "1h" ? setRemember1("100h") : setRemember1("1h"); }}
              style={[(remember1 !== "1h") && { backgroundColor: 'green' },
              { margin: 5, width: 2, height: 2, borderColor: '#777', borderWidth: 2, padding: 6.5, borderRadius: 1 }]}
            />
            <Icon onPress={() => { Keyboard.dismiss(); remember1 == "1h" ? setRemember1("100h") : setRemember1("1h"); }}
              name={"check"} size={18} color="#f0f0f0" style={[(remember1 !== "1h") && { backgroundColor: 'blue' },
              { right: 22.4, marginTop: 4.9 }]} />

          </View>


          <View style={{ paddingTop: 0, padding: 20, marginTop: 30 }}>

            <Link to={{ screen: 'ForgetPass', params: { id: 'jane' } }}
              style={{ padding: 8, color: '#00f9', textAlign: "right", marginRight: 10 }}>فراموشی رمز عبور</Link>
            <View style={{ backgroundColor: "silver", marginTop: 18, width: "90%", alignSelf: "center" }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        </View>
      )}
    </Formik>)
}

export default Login