import React, { useState } from 'react'
import { View, StatusBar, Button, TextInput } from 'react-native'
import { sendcode, verifycode } from '../../services/userService'



const Sms = ({ navigation, route }) => {

  const [myPhone, setMyPhone] = useState()
  const [myCode, setMyCode] = useState()

  const handlePhone = () => {
    sendcode({ phone: myPhone })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err))
  }


  const handleCode = () => {
    verifycode({ code: myCode })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err))
  }




  return (
    <View style={{ borderWidth: 9, marginTop: StatusBar.currentHeight }}>

      <View style={{ marginHorizontal: '37%', width: "22%", justifyContent: 'center' }}>
        <TextInput value={myPhone} onChangeText={(text) => setMyPhone(text)} style={{ borderWidth: 1 }} placeholder="phone" />
        <Button onPress={handlePhone} title="ارسال" />
      </View>

      <View style={{ marginHorizontal: '37%', width: "22%", justifyContent: 'center' }}>
        <TextInput value={myCode} onChangeText={(text) => setMyCode(text)} style={{ borderWidth: 1 }} placeholder="code" />
        <Button onPress={handleCode} title="ارسال" />
      </View>

    </View>
  )
}

export default Sms