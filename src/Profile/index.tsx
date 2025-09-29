import Mapbox, {
  Atmosphere,
  Callout,
  CircleLayer,
  LineLayer,
  PointAnnotation,
  ShapeSource,
} from '@rnmapbox/maps';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

Mapbox.setAccessToken(
  'pk.eyJ1IjoibWVodWx0YXR2YSIsImEiOiJjbWF3OXF2bzYwOTlvMm1zNXExdzR2cjN6In0.NJITQ-NOheowbtBZ8N_41Q',
);
function Profile() {
  const [coordinates] = useState([72.512, 23.0479]);
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [styleURL, setStyleURL] = useState(
    'mapbox://styles/mapbox/streets-v12',
  );

  const [points] = useState([
    [139.6917, 35.6895], // Tokyo
    [139.638, 35.4437], // Yokohama
  ]);

  const lineString = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: points,
        },
      },
    ],
  };
  const geoJsonData = {
    type: 'FeatureCollection',
    features: [
      // 🔵 Cities (Points)
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [139.6917, 35.6895] }, // Tokyo
        properties: { name: 'Tokyo', color: 'red' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [139.638, 35.4437] }, // Yokohama
        properties: { name: 'Yokohama', color: 'blue' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [135.5022, 34.6937] }, // Osaka
        properties: { name: 'Osaka', color: 'green' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [135.7681, 35.0116] }, // Kyoto
        properties: { name: 'Kyoto', color: 'purple' },
      },

      // 🟢 Routes (LineStrings)
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [139.6917, 35.6895], // Tokyo
            [139.638, 35.4437], // Yokohama
          ],
        },
        properties: { route: 'Tokyo-Yokohama', color: 'black' },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [139.6917, 35.6895], // Tokyo
            [135.5022, 34.6937], // Osaka
          ],
        },
        properties: { route: 'Tokyo-Osaka', color: 'orange' },
      },

      // 🔶 Polygon (example area around Tokyo Bay)
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [139.8, 35.6],
              [139.9, 35.6],
              [139.9, 35.7],
              [139.8, 35.7],
              [139.8, 35.6], // closed loop
            ],
          ],
        },
        properties: { name: 'Tokyo Bay Area', color: 'rgba(0, 0, 255, 0.3)' },
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView styleURL={styleURL} style={{ flex: 1 }}>
        <Mapbox.Camera zoomLevel={8} centerCoordinate={[139.6917, 35.6895]} />
        {/* Simple marker point with tooltip */}
        {/* <PointAnnotation id="marker1" coordinate={coordinates}>
          <Callout title="Hello New York!" />
        </PointAnnotation> */}

        {/* Draw line with 2 coreds */}
        {/* <ShapeSource id="lineSource" shape={lineString}>
          <LineLayer
            id="lineLayer"
            style={{
              lineColor: 'black',
              lineWidth: 4,
            }}
          />
        </ShapeSource>

        <PointAnnotation id="tokyo" coordinate={points[0]} />
        <PointAnnotation id="yokohama" coordinate={points[1]} /> */}

        {/* when want multiple path with ponits  */}
        {/* <ShapeSource id="source1" shape={geoJsonData}>
          <LineLayer
            id="lineLayer"
            style={{
              lineColor: 'black',
              lineWidth: 4,
            }}
          />

          <CircleLayer
            id="circleLayer"
            style={{
              circleRadius: 6,
              circleColor: 'red',
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
        </ShapeSource> */}
      </Mapbox.MapView>
      <Button
        title="Switch to Dark"
        onPress={() => setStyleURL('mapbox://styles/mapbox/dark-v11')}
      />
      <Button
        title="Switch to Satellite"
        onPress={() =>
          setStyleURL('mapbox://styles/mapbox/satellite-streets-v12')
        }
      />
    </View>
  );
}

export default Profile;

// Mapbox Notes

/*
Add package add code in android/ build.gradel, add there key
rebuild


*/
