import React from 'react'
import { Formik } from 'formik'
import { View, Text, Button, TextInput } from 'react-native'
import { forgetpassword } from '../../services/userService'
import Styles from "../../styles/Styles";
import { useFocusEffect } from '@react-navigation/native';



export const ForgetPass = ({ navigation }) => {


  return (
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius:4,borderColor: 'silver', borderWidth: 1 ,padding:12}}>
        <Formik initialValues={{ email: "" }} onSubmit={async (values) => {
          try {
            const { status } = await forgetpassword({ email: values.email })
            if (status === 200) { alert("موفق بود") }
          } catch (err) { console.log(err); }
        }}>
          {({ handleChange, handleSubmit, values }) => (
            <View style={{ backgroundColor: "#fff" }}>
            <Text style={{textAlign:"right", marginBottom:15}}>تغییر رمز عبور</Text>

              <TextInput onChangeText={handleChange("email")} placeholder="آدرس ایمیل" value={values.email}
                autoCompleteType="email" keyboardType="email-address"
                style={[Styles.RtextInput, { borderColor: "#999", borderWidth: 2 }]} />

              <View style={{backgroundColor: "lightblue", borderRadius: 7, marginTop: 22, width: '95%', margin: "auto"}}>
                <Button onPress={handleSubmit} title="ارسال ایمیل " />
              </View>

            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

export default ForgetPass