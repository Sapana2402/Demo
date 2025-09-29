import { useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Import Map and Marker
import MapView, { Callout, Marker, Polygon, Polyline } from 'react-native-maps';
import { decode } from '@mapbox/polyline';

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const chibaRegion = {
  latitude: 35.6074,
  longitude: 140.1065,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const polygonCoordinates = [
  { latitude: 37.78825, longitude: -122.4324 },
  { latitude: 37.75825, longitude: -122.4324 },
  { latitude: 37.75825, longitude: -122.4024 },
  { latitude: 37.78825, longitude: -122.4024 },
];

const CustomeMarker = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'green',
      }}
    >
      <Image
        source={require('../assets/car.png')}
        style={{ height: 100, width: 100 }}
        resizeMode="contain"
      />
    </View>
  );
};
function DetailsScreen() {
  const myRef = useRef(null);

  useEffect(() => {
    //fetch the coordinates and then store its value into the coords Hook.
    const getData = async () => {
      await getDirections('52.5200066,13.404954', '50.1109221,8.6821267')
        .then(coords => console.log('cordesssss', coords))
        .catch(err => console.log('Something went wrong'));
    };
    getData();
  }, []);

  const goToLocation = () => {
    myRef.current.animateToRegion(tokyoRegion, 3 * 1000);
  };

  const getDirections = async (startLocation, endLocation) => {
    // const KEY = 'AIzaSyD56VlmvBCSjOzdvsNBEsHWoJhwPnM3FGg'
    const KEY = 'AIzaSyAwHI7IV5CSAfu5PRlb52VKqfJSSD471eQ';
    let res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${endLocation}&key=${KEY}`,
    );
    let response = res.json();
    console.log('responseresponse=========', response);

    let points = decode(response.routes[0].overview_polyline.points);
    console.log('points=====', points);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ backgroundColor: 'red', zIndex: 1 }}
          onPress={() => goToLocation()}
        >
          <Text>Go to Location</Text>
        </TouchableOpacity>
        <MapView
          ref={myRef}
          style={styles.mapStyle}
          initialRegion={tokyoRegion}
          // customMapStyle={mapStyle}
        >
          <Marker
            draggable
            // coordinate={{
            //   latitude: 37.78825,
            //   longitude: -122.4324,
            // }}
            coordinate={tokyoRegion}
            onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          >
            {/* <CustomeMarker /> */}
            <Callout>
              <View>
                <Text>Custom Callout Title</Text>
                <Text>More details here.</Text>
              </View>
            </Callout>
          </Marker>

          {/* <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 200, 0, 0.5)" // Green with 50% opacity
            strokeColor="rgba(0,0,0,0.5)" // Black with 50% opacity
            strokeWidth={2}
          /> */}

          <Polyline
            coordinates={[tokyoRegion, chibaRegion]}
            strokeColor="black"
            strokeWidth={5}
            lineDashPattern={[1]}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

// const mapStyle = [
//   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [{color: '#263c3f'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#6b9a76'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{color: '#38414e'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#212a37'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#9ca5b3'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [{color: '#746855'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#1f2835'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#f3d19c'}],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'geometry',
//     stylers: [{color: '#2f3948'}],
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [{color: '#17263c'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#515c6d'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.stroke',
//     stylers: [{color: '#17263c'}],
//   },
// ];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DetailsScreen;
