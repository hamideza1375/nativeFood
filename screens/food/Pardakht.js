import { useFocusEffect } from '@react-navigation/native'
import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StatusBar, Image, Button, TextInput, ScrollView } from 'react-native'
import { payment, getfoods } from '../../services/courseService'
import localStorage from "@react-native-async-storage/async-storage"
import Icon from 'react-native-vector-icons/dist/FontAwesome';



const Pardakht = ({ navigation }) => {

  var ff = []
  const [allPrice, setAllPrice] = useState(0)
  const [foodPlus, setFoodPlus] = useState(false)
  const [hh, setHh] = useState([])
  const rer = useRef()

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { data } = await getfoods();
        ff = []
        for (let a in data) {
          let gf = await localStorage.getItem(data[a]._id)
          let t = JSON.parse(gf)
          if (gf) {
            for (let b of t[0]) {
              ff.push(b)
            }
          } else setHh([])
        }
        j = ff.filter((f) => (
          f.total > 0
        ))
        setHh(j)


        let ttt = hh.map((h) => (h.total))
        const fff = ttt.reduce((total, number) => total + number)
        setAllPrice(fff);


      })()
    }, []))

  useFocusEffect(

    useCallback(
      () => {
        if (hh.length > 0) {
          const wer = hh.map((h) => (h.total))
          const fer = wer.reduce((total, number) => total + number)
          setAllPrice(fer);
        }
      },
      [hh],
    )


  )



  const del = async () => {
    try {
      const { data } = await getfoods()
      data.map((f) => {
        localStorage.removeItem(f._id)
          .then((res) => console.log(res))
      })
      setHh([])
      setAllPrice(0)
    }
    catch (err) { console.log(err); }
  }




  return (
    <View style={{ flexBasis: '100%', flexDirection: 'row', marginTop: StatusBar.currentHeight }}>


      <View style={{ flexBasis: '29%', borderWidth: 1, }}>
        <View style={{ backgroundColor: 'aqua', marginBottom:66, borderRadius:5}} >
          <Button title={'لغو سفارش'} onPress={del} />
        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          <Text style={{ width: 52, borderWidth: 1, paddingVertical: 4, textAlign: 'center' }}>نام</Text>
          <Text style={{ width: 52, borderWidth: 1, paddingVertical: 4, textAlign: 'center' }}>قیمت</Text>
        </View>

        {hh.map((h) => (
          h.num > 0 &&
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <Text style={{ width: 52, borderWidth: 1, paddingVertical: 4, textAlign: 'center' }}>{h.title}</Text>

            <Text style={{ width: 52, borderWidth: 1, paddingVertical: 4, textAlign: 'center' }}>{h.total}</Text>
          </View>
        ))}

      </View>



      <View style={{ flexBasis: '70%', borderWidth: 1, }}>
        <View style={{ backgroundColor: '#393', borderRadius: 3 }}>
          <Button onPress={async () => {
            try {
              const { data } = await payment(allPrice)
              navigation.navigate("Payment", { uri: data })
            }
            catch (err) { console.log(err); }
          }} color="#fff" title={`پرداخت:${allPrice ? allPrice.toString() : "0"} تومان`} />
        </View>
        <View style={{ flex: 1 }}>


          <ScrollView numColumns={2} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            style={{ borderWidth: 2, }}
          >


            {/* //? */}

            {hh.map((item, index) => (
              item.num > 0 &&
              <View key={item._id} style={{
                alignItems: 'center', marginHorizontal: 15, marginVertical: 42, flexBasis: '38%', height: 200,
                justifyContent: 'space-around'
              }}>
                <Image style={{ borderRadius: 4, width: "99%", height: 100 }} source={{ uri: `http://192.168.42.34/upload/${item.imageUrl}` }} />
                <Text style={{ textAlign: "center", top: -32, padding: 8, width: "100%", backgroundColor: '#9999', }}>
                  {item.title}
                </Text>
                <View style={{ paddingBottom: 9, marginBottom: 6 }}>
                  {/* // ? plus */}
                  <Icon size={13} name="plus" onPress={async () => {
                    let h = [...hh]
                    h[index].num = h[index].num + 1
                    h[index].total = item.price * h[index].num
                    setHh(h)
                    let gf = await localStorage.getItem(hh[index].commentId)
                    let ty = JSON.parse(gf)
                    let fc = ty[0]
                    let tt = fc.findIndex((f) => f._id == item._id)
                    fc[tt].num = fc[tt].num + 1
                    fc[tt].total = fc[tt].price * h[index].num
                    await localStorage.setItem(hh[index].commentId, JSON.stringify(ty))
                    let ttt = hh.map((h) => (h.total))
                    const fff = ttt.reduce((total, number) => total + number)
                    setAllPrice(fff);
                  }} color='blue' />
                  {/* // ? plus     */}
                  <TextInput keyboardType='numeric' ref={rer} value={item.num.toString()} style={{ marginVertical: 3 }} />
                  {/* // ! minus     */}
                  <Icon size={13} name="minus" color='red' onPress={async () => {
                    if (hh[index].num > 0) {
                      let h = [...hh]
                      h[index].num = h[index].num - 1
                      h[index].total = item.price * h[index].num
                      h[index].total = item.price * h[index].num
                      setHh(h)
                      let gf = await localStorage.getItem(hh[index].commentId)
                      let ty = JSON.parse(gf)
                      let fc = ty[0]
                      let tt = fc.findIndex((f) => f._id == item._id)
                      fc[tt].num = fc[tt].num - 1
                      fc[tt].total = fc[tt].price * h[index].num
                      await localStorage.setItem(hh[index].commentId, JSON.stringify(ty))
                      let ttt = hh.map((h) => (h.total))
                      const fff = ttt.reduce((total, number) => total + number)
                      setAllPrice(fff);
                    }
                  }} />
                </View>
                <View style={{ flexDirection: "row", width: '99%', justifyContent: 'center', position: 'relative' }}>
                  <Text style={{ padding: 8, width: 60, marginRight: 20, textAlign: 'left' }}>
                    فیمت:{item.price}
                  </Text>
                  <View style={{ position: "absolute", right: 59, marginTop: 2, zIndex: 33 }}>
                  </View>
                </View>
              </View>

            ))}
          </ScrollView>
        </View>
        <View>
        </View>
      </View>
    </View >
  )
}

export default Pardakht