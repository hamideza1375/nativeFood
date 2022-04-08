import React from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { Formik } from 'formik';
import { resetpassword } from '../../services/userService';
import Styles from "../../styles/Styles";



export const ResetPass = ({ navigation, route }) => {


  return (
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
    <View style={{ borderRadius:4,borderColor: 'silver', borderWidth: 1 ,padding:12}}>
    <Formik initialValues={{ password: "", confirmPassword: "" }} onSubmit={async (values) => {
        try {
          const { status } = resetpassword(route.params.id, { password:values.password, confirmPassword:values.confirmPassword })
          if (status === 200) alert("تغییر رمز موفق آمیز بود") 
        } catch (err) { console.log(err); }
        }}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text style={{textAlign:"right"}}>تغییر رمز عبور</Text>
            <TextInput style={[Styles.RtextInput, { borderColor: "#999", borderWidth: 2,marginVertical:15 }]} 
            onChangeText={handleChange("password")} placeholder="پسورد" value={values.password}
              keyboardType="numeric" autoCompleteType="password" />

            <TextInput style={[Styles.RtextInput, { borderColor: "#999", borderWidth: 2 }]} 
            value={values.confirmPassword} onChange={handleChange("confirmPassword")} 
             keyboardType="numeric" autoCompleteType="password" placeholder="تکرار پسورد"/>
           
           <View style={{backgroundColor: "lightblue", borderRadius: 7, marginTop: 22, width: '95%', margin: "auto"}}>
            <Button onPress={handleSubmit} title="تغییر رمز عبور" />
            </View>
         
              </View>
        )}
      </Formik>
    </View>
    </View>
  )}
export default ResetPass