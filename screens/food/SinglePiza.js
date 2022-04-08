import React, { useState, useEffect } from 'react'
import { Button, View, Text, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import { getsinglechildfood, getcommentchildfood, createcommentchildfood } from '../../services/courseService';
import * as Yup from "yup";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Formik } from 'formik';
import Styles from "../../styles/Styles";



const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  email: Yup.string()
    .required("این فیلد الزامی می باشد")
    .email("ایمیل معتبر نمی باشد"),
  message: Yup.string()
    .required("این فیلد الزامی می باشد").min(3),

});



const SinglePiza = ({ navigation, route }) => {

  const [food, setFood] = useState({})
  const [comment, setComment] = useState([])


  useEffect(() => {
    getsinglechildfood(route.params.id, route.params.id2)
      .then(({ data }) => setFood(data.child))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    getcommentchildfood(route.params.id, route.params.id2)
      .then(({ data }) => {
        setComment(data.comment)
      })
      .catch((err) => console.log(err))
  }, [comment])










  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image style={{ width: "98%",alignSelf:"center", height: 222 }} source={{ uri: `http://192.168.42.34/upload/${food.imageUrl}` }} />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ padding: 8 }}>{food.price}</Text>
          <Text style={{ padding: 8 }}>{food.title}</Text>
        </View>




        <Formik initialValues={{ fullname: "", email: "", message: ""}}
          onSubmit={(values) => {
            createcommentchildfood(route.params.id, route.params.id2, values)
              .then(() => console.log(1))
              .catch((err) => console.log(err))
              setComment(comment)
          }}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
           
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
             

              <View style={{ padding: 24, flex: 1, justifyContent: "space-around" }}>

                {/* // ! <Swipable renderRightActions={deleteAction}> */}
                <View style={Styles.Rcontainer}>
                  <TextInput
                    // autoCompleteType={true}
                    autoCapitalize='none'
                    placeholder='نام کاربری'
                    keyboardAppearance='dark'
                    keyboardType='default'
                    autoComplete={true}
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
                    placeholder='پیام'
                    keyboardAppearance='dark'
                    autoComplete={false}
                    autoCorrect={false}
                    style={Styles.RtextInput}
                    placeholderTextColor="royalblue"
                    onChangeText={handleChange("message")}
                    value={values.message}
                    onBlur={() => setFieldTouched("message")} />
                  <Icon name="address-card" size={30} color="#555" style={Styles.Ricon} />
                </View>

                {errors.message && touched.message && <Text style={{ color: 'red' }}>{errors.message}</Text>}


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


                <View
                  style={{ alignSelf: "center", width: "95%", borderRadius: 7, padding: 7, marginTop: 20, backgroundColor: "lightblue" }}>
                  <Button onPress={handleSubmit} title="Submit" />
                </View>

              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>





        <View>
          {comment.map(e => (
            <View key={e._id} style={{ borderRadius: 3, marginVertical: 15, width: '75%', flexDirection: "row" }}>
              <View style={{ marginHorizontal: 15, width: '95%' }}>
                <Text style={{ width: "100%", padding: 5, textAlign: 'right', margin: 0, borderWidth: 1 }}>{e.fullname}</Text>
                <TextInput multiline value={e.message} style={{ width: '100%', padding: 5, textAlign: 'right', margin: 0, borderWidth: 1 }} />
              </View>
              <Text style={{ borderRadius: 3, width: "17%", height: 53, margin: 0, borderWidth: 1 }}>image</Text>
            </View>
          ))
          }
        </View>


    </ScrollView>
  )
}

export default SinglePiza









{/* 
        <View style={{ backgroundColor: 'red' }}>
          <Button onPress={async () => {
            try {
              const { data } = await payment(route.params.id)
              return navigation.navigate("Payment", { uri: data })
            } catch (err) { console.log(err); }
          }} title="kharid" />
        </View> */}