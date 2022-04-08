import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { reverse, geocode } from '../../services/courseService';
import RNLocation from 'react-native-location';




const Location = () => {

  // useEffect(() => {   
    
//     RNLocation.configure({
//       distanceFilter: 5.0
//     })
    
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "coarse"
//       }
//     }).then(granted => {
//         if (granted) {
//           this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
// console.log(locations);
//           })
//         }
//       })


    
  //   import Geolocation from '@react-native-community/geolocation'
  //   // import Geolocation from 'react-native-geolocation-service';
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );



  // Geolocation.getCurrentPosition(info => console.log(info));
  // }, [])


  const [markers, setmarkers] = useState({
    latitude: 36.224174234928924,
    longitude: 57.69491965736432,
    latitudeDelta: 0.004,
    longitudeDelta: 0.00800,
  })

  const [show, setShow] = useState(true)
  const [streetName, setStreetName] = useState()
  const [formattedAddress, setFormattedAddress] = useState()

  const [search1, setSearch1] = useState()
  const [search2, setSearch2] = useState(false)


  useEffect(() => {
    search2 &&
      geocode({ loc: `سبزوار ${search1}` })
        .then(({ data }) => {
          console.log(data[0]);
          setmarkers(
            {
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.00300,
            })
          setSearch2(false)
        })
        .catch((err) => {
          // if(err){setSearch1("رازی")}
          console.log(err)})

  }, [search2])



  const uy = (e) => {
    setmarkers({ ...e.nativeEvent.coordinate, latitudeDelta: 0.003, longitudeDelta: 0.00300 });
  }



  useEffect(() => {
    reverse(markers)
      .then(({ data }) => {
        // console.log(data[0])
        setFormattedAddress(data[0].formattedAddress)
        setStreetName(data[0].streetName)
      })
      .catch((err) => console.log(err))
  }, [markers])







  const onRegionChange = () => {
    setmarkers(markers);
  }



  RNLocation.configure({
    distanceFilter: 100
  })

  return (
    <View style={styles.container}>
      <MapView
        onRegionChange={() => { onRegionChange(); }}
        region={markers}
        showsUserLocation={true}
        style={styles.map}
        onPress={() => setShow(!show)}
      >


        <Marker
          draggable={true}
          coordinate={markers}
          onDragEnd={(e) => { uy(e); setShow(true) }}
          onSelect={(e) => { setShow(!show) }}
          image={require("../../assets/images/marker1.png")}
        />

      </MapView>

      {show && 
      <View style={{ flex: .1, backgroundColor: "#fff", width: "100%", marginHorizontal: "auto", padding: 15 }}>
        <View style={{
          marginTop: 7, borderRadius: 5, width: "80%", height: 45, backgroundColor: "#3229"
          , alignSelf: 'center', borderColor: 'silver', borderWidth: 2, justifyContent: "center", alignContent: "center", alignItems: "center"
        }}>

          <TextInput
            style={{ color: "#fff" }}
            onChangeText={setSearch1}
            value={search1}
            placeholder="useless placeholder"
            keyboardType="default"
            placeholderTextColor={'silver'}
          />
          <View />
          <View>
            <Button title="clk" onPress={() => { setSearch2(!search2); setShow(true) }} />

          </View>

        </View>
      </View>
      }


      {show && 
      <View style={{ flex: .17, backgroundColor: "#fff", width: "100%", marginHorizontal: "auto", padding: 15 }}>

        <Text style={{ textAlign: "right", }}>{streetName}</Text>
        {(streetName != undefined) ? <Text style={{ margin: 3 }} /> : null}
        <Text style={{ textAlign: "right", }}>{formattedAddress}</Text>
      </View>
      }

    </View >

  );

}




const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default Location