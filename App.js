/**
 * Find my Vaccine App find your nearest covid vaccine
 * https://github.com/deveshkakkar/FindMyVaccine
 *
 */
 import React, { useEffect, useState } from 'react';
 import MapView from 'react-native-maps';
 import { FlatList, Text, View, Button, Image, SafeAreaView } from 'react-native';
 import StatePicker from './StatePicker';
 
 export default App = () => {
   const [isLoading, setLoading] = useState(true);
   const [shouldShow, setShouldShow] = useState(true);
   const [data, setData] = useState([]);
   var markers = [
    {
      latitude: 45.65,
      longitude: -78.90,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    }
  ];
   console.log(data);
 
   useEffect(() => {
     fetch(
       'https://www.vaccinespotter.org/api/v0/states/CT.json'
     )
       .then((response) => response.json())
       .then((json) => setData(json))
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
   }, []);
 
   return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Button
        title="Pick Your State"
        onPress={() => setShouldShow(!shouldShow)}
      />
      {shouldShow ? (
        <StatePicker />
      ) : null}
      <MapView
      style={{ flex: 1 }}
      region={{
        latitude: data.features[0].coordinates[0],
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>
            {data.metadata.appointments_last_fetched}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'green',
              textAlign: 'center',
              paddingBottom: 10,
            }}>
            Available Vaccines:
          </Text>
          
          <FlatList
            data={data.features}
            renderItem={({ item }) => (
              <Text>{item.properties.address + ', '+ item.properties.city + ', ' + item.properties.state}</Text>
              
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const getStoresFromApiAsync = async () => {
  try {
    let response = await fetch(
      'https://www.vaccinespotter.org/api/v0/states/CT.json'
    );
    let StoreJson = await response.json();
    return StoreJson;
  } catch (error) {
    console.error(error);
  }
};

