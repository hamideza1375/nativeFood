import React, { useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Formik } from 'formik';
import * as Yup from "yup";
import Styles from "../../styles/Styles";
import { registerUser } from '../../services/userService';
import Icon from 'react-native-vector-icons/dist/FontAwesome';





const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  password: Yup.string()
    .required("این فیلد الزامی می باشد")
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد"),
  passwordConfirmation: Yup.string()
    .required("تکرار کلمه عبور الزامی می باشد")
    .oneOf([Yup.ref("password"), null], "کلمه های عبور باید یکسان باشند"),
});




// !
// !
// !
// !
// !
const deleteAction = () => {
  return (
    <TouchableOpacity style={{ borderRadius: 4, marginTop: 30, marginLeft: 20, backgroundColor: "tomato", width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => alert(22)}>
      {/* <MaterialCommunityIcons name="trash-can" size={35} color="#fff" /> */}
    </TouchableOpacity>
  );
};
// !
// !
// !
// !
// !
const Register = props => {


  const [eye, setEye] = useState("eye-slash")
  const [eye2, setEye2] = useState("eye-slash")

  const [secure, setSecure] = useState(true)
  const [secure2, setSecure2] = useState(true)

  // setSecure



  return (
    <Formik initialValues={{ fullname: "", email: "", password: "", passwordConfirmation: "" }}
      onSubmit={async (values) => {
        const { status } = await registerUser(values); if (status == 201)
          alert('goos');
      }}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>

          <View style={{ padding: 24, flex: 1, justifyContent: "space-around" }}>

            {/* // ! <Swipable renderRightActions={deleteAction}> */}
            <View style={Styles.Rcontainer}>
              <TextInput
            autoCapitalize='none'
                textContentType="name"
                placeholder='نام کاربری'
                autoCompleteType="password"
                keyboardAppearance='dark'
                keyboardType='name-phone-pad'
                autoComplete="name"
                autoCorrect={false}
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                onChangeText={handleChange("fullname")}
                value={values.fullname}
                onBlur={() => setFieldTouched("fullname")} />
              <Icon name="address-card" size={30} color="#555" style={Styles.Ricon} />
            </View>
            {/*// !  </Swipable> */}

            {errors.fullname && touched.fullname && <Text style={{ color: 'red' }}>{errors.fullname}</Text>}



            <View style={Styles.Rcontainer}>
              <TextInput
            autoCapitalize='none'
                textContentType="emailAddress"
                placeholder="ایمیل کاربری"
                autoCompleteType="email"
                keyboardType="email-address"
                autoComplete="email"
                autoCorrect={false}
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={() => setFieldTouched("email")} />
              <Icon name="envelope" size={30} color="#555" style={Styles.Ricon} />
            </View>

            {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}




            <View style={Styles.Rcontainer}>
              <TextInput
            autoCapitalize='none'
                textContentType="password"
                placeholder="کلمه عبور"
                autoCompleteType="password"
                keyboardType="default"
                autoComplete="password"
                autoCorrect={false}
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                secureTextEntry={secure}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={() => setFieldTouched("password")} />

              <Icon onPress={() => { setSecure(!secure); }} name={!secure ? "eye" : "eye-slash"} size={30} color="#555" backgroundColor='blue' style={Styles.Ricon} />

            </View>
            {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}




            <View style={Styles.Rcontainer}>
              <TextInput
            autoCapitalize='none'
                textContentType="password"
                placeholder="کلمه عبور"
                autoCompleteType="password"
                keyboardType="default"
                autoComplete="password"
                autoCorrect={false}
                style={Styles.RtextInput}
                placeholderTextColor="royalblue"
                secureTextEntry={secure2}
                onChangeText={handleChange("passwordConfirmation")}
                value={values.passwordConfirmation}
                onBlur={() => setFieldTouched("passwordConfirmation")} />
              <Icon onPress={() => { setSecure2(!secure2); }} name={!secure2 ? "eye" : "eye-slash"} size={30} color="#555" backgroundColor='blue' style={Styles.Ricon} />

            </View>
            {errors.passwordConfirmation && touched.passwordConfirmation && <Text style={{ color: 'red' }}>{errors.passwordConfirmation}</Text>}


            <View 
            style={{ alignSelf:"center",width:"95%",borderRadius:7,padding: 7, marginTop: 20,backgroundColor:"lightblue" }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>

          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default Register
