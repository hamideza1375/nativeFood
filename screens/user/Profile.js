import React from 'react'
import { Text, View, Image } from 'react-native'

const Profile = () => {
  return (
    <View flex={1}>
      <View style={{padding:7,flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{alignSelf:'flex-end'}}>salam</Text>
        <Image source={ require("../../assets/images/a8.jpg") } style={{ borderRadius:3,height: 100, width: 100 }} />
      </View>
      <View style={{ width:'1000%',alignSelf:'center',borderBottomColor: 'red', borderBottomWidth: 9 }} />
    </View>
  )
}



export default Profile