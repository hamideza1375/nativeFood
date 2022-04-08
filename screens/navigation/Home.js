import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { getfoods } from '../../services/courseService';


const Home = ({ navigation }) => {

  const [food, setFood] = useState([])

  useEffect(() => {
    navigation.getParent().addListener('tabPress', (e) => {
      console.log(444);
    });
  }, [])


  useEffect(() => {
    getfoods()
      .then(({ data }) => setFood(data))
      .catch((err) => console.log(err))
  }, [])




  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>


      <View style={{
        width: "100%", height: 70, backgroundColor: "#fff",
        borderColor: "#999", borderBottomWidth: .2, justifyContent: "center", paddingBottom: 7
      }}>
        <View style={{
          flexDirection: "row", alignItems: "center",
          marginTop: 9, borderRadius: 5, width: "90%", height: 43, backgroundColor: "#99999911",
          alignSelf: 'center', borderColor: '#9999', borderWidth: .3, justifyContent: "center"
        }}>
          <Icon name="search" size={20} color="#999" style={{ padding: 11 }} />
          <TextInput placeholder="جستجو غذا و نوشیدنی" keyboardType="default" placeholderTextColor={'#888'}
            style={{ fontFamily: 'FontAwesome', marginLeft: 'auto', padding: 10, fontWeight: '100' }} />
        </View>

      </View>
      <Image source={require("../../assets/images/iconpiza.png")}
        style={{ width: 170, height: 170, marginVertical: 20 }} />


      <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-around" }}>

        {food && food.map((food) => (
          <TouchableOpacity key={food._id} onPress={() => navigation.navigate(`food`, { id: food._id })}>
            <Image source={{ uri: `http://192.168.42.34/upload/${food.imageUrl}` }} style={{ width: 115, height: 125, borderRadius: 5 }} />
            <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 6, fontWeight: '200', }}>{food.title}</Text>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  )
}

export default Home
