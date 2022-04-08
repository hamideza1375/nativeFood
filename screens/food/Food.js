import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getallchildfood, payplus } from '../../services/courseService';
import localStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';






const Food = ({ navigation, route }) => {

  var c = []
  const [piza, setPiza] = useState([])
  const [num, setNum] = useState(c)
  const rer = useRef()



  useFocusEffect(
    useCallback(() => {
      getallchildfood(route.params.id)
        .then(({ data }) => {
          c.push(data.child)
          setPiza(data.child)
        })
        .catch((err) => { console.log(err) })
    }, [])
  )




  useFocusEffect(
    useCallback(() => {
      (async () => {
        let trr = await localStorage.getItem(route.params.id)
        let hh = JSON.parse(trr)
        trr && setNum(hh)
      })()
      return async () => {
        const price = await localStorage.getItem("sum")
        payplus({ price }, route.params.id)
          .then(() => console.log('ggggoooddddsss'))
          .catch((err) => console.log(err))
        console.log("ad", price);
      }
    }, [])
  );





  useEffect(() => {
    if (num.length >= 1) {
      let qaq = num[0].map((n, i) => n.total);
      const sum = qaq.reduce((total, number) => total + number);
      localStorage.setItem("sum", JSON.stringify(sum))
        .then(() => console.log())
        .catch((err) => console.log(err))
      console.log('summmm', sum);
    }
  }, [num])




 

  return (
    <View style={{
      marginTop: 10,
      flex: 1, backgroundColor: '#fff',
      alignItems: 'space-between',
    }}>
      <FlatList
        keyExtractor={(piza) => piza._id.toString()}
        numColumns={2}
        data={piza}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SinglePiza", { id: route.params.id, id2: item._id })}
            style={{ flexBasis: "44%", alignItems: 'center', marginHorizontal: 15, marginVertical: 42, width: "42%", height: 200, }}>
            <Image
              defaultSource={require('../../assets/images/a17.jpg')}
              blurRadius={3}
              style={{ borderRadius: 4, width: "100%", height: "80%" }}
              source={{ uri: `http://192.168.42.34/upload/${item.imageUrl}` }}
            />
            <Text style={{ textAlign: "center", top: -32, padding: 8, width: "100%", backgroundColor: '#9999', }}>{item.title}</Text>
            <View style={{ flexDirection: "row", width: '99%', justifyContent: 'center', position: 'relative' }}>
              <Text style={{ padding: 8, width: 60, marginRight: 20, textAlign: 'left' }}>فیمت:{item.price}</Text>
              <View style={{ position: "absolute", right: 59, marginTop: 2, zIndex: 33 }}>
                {/* // */}
                <Icon size={13} name="plus" onPress={() => {
                  num[0][index] &&
                    setNum(() => {
                      let h = [...num]
                      h[0][index].num = h[0][index].num + 1
                      h[0][index].total = item.price * h[0][index].num
                      localStorage.setItem(route.params.id, JSON.stringify(h))
                        .then(() => console.log())
                      return h
                    })
                }} color='blue' />

                <TextInput ref={rer} value={num[0][index] && num[0][index].num.toString()} style={{ paddingVertical: 5 }} />

                <Icon size={13} name="minus" onPress={() => {
                  num[0][index] && num[0][index].num > 0 && setNum(() => {
                    let h = [...num]
                    h[0][index].num = h[0][index].num - 1
                    h[0][index].total = item.price * h[0][index].num
                    localStorage.setItem(route.params.id, JSON.stringify(h))
                      .then(() => console.log())
                    return h
                  })
                }} color='red' />
                {/* <//     ?// *      /> */}
              </View>
              <Text onPress={() => {
                num[0][index].num == 0 && setNum(() => {
                  let h = [...num]
                  h[0][index].num = h[0][index].num + 1
                  h[0][index].total = item.price * h[0][index].num
                  localStorage.setItem(route.params.id, JSON.stringify(h))
                    .then(() => console.log())
                  return h
                })
              }}
                style={{ padding: 8, width: 66, textAlign: 'center', marginLeft: 15, textAlign: 'right' }}>افزودن به سبد</Text>
            </View>
          </TouchableOpacity>
        )} />
      <Pressable onPress={async () => {
        let token = await localStorage.getItem('token')
        token ?
          navigation.navigate("Pardakht")
          :
          navigation.navigate("Users")
      }} style={{ width: "100%", height: 90, backgroundColor: "silver", flexDirection: 'row' }}>
        <Image style={{ width: 70, height: 70, margin: 11, marginTop: 6, borderRadius: 5 }}
          source={{ uri: "https://atawich.com/Content/images/765/Product/7d18d2b3-ff14-4398-98e0-22f305eaee62.jpg" }} />
        <View style={{ textAlign: 'right', padding: 12, marginLeft: 'auto' }}>
          <Text>مشاهده ی سبد و پرداخت</Text>
          <Text style={{ textAlign: 'right', padding: 12 }}>قیمت کل:3699</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Food