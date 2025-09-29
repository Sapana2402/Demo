// import Mapbox, { ShapeSource, LineLayer } from '@rnmapbox/maps';
// import { useEffect, useState } from 'react';
// import { View } from 'react-native';
// const access_tokenn = "pk.eyJ1IjoibWVodWx0YXR2YSIsImEiOiJjbWF3OXF2bzYwOTlvMm1zNXExdzR2cjN6In0.NJITQ-NOheowbtBZ8N_41Q"
// Mapbox.setAccessToken(access_tokenn);

// function RoadRoute() {
//   const [route, setRoute] = useState(null);

//   // Tokyo → Yokohama
// const origin = [72.5096, 23.0574];      // Hinglaj Complex, Thaltej
//   const destination = [72.5086, 23.0305];

//   useEffect(() => {
//     const fetchRoute = async () => {
//       const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${access_tokenn}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.routes && data.routes.length > 0) {
//           setRoute({
//             type: 'Feature',
//             geometry: data.routes[0].geometry, // road geometry
//           });
//         }
//       } catch (err) {
//         console.error('Error fetching route:', err);
//       }
//     };

//     fetchRoute();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <Mapbox.MapView style={{ flex: 1 }}>
//         <Mapbox.Camera zoomLevel={15} centerCoordinate={origin} />

//         {route && (
//           <ShapeSource id="routeSource" shape={route}>
//             <LineLayer
//               id="routeLine"
//               style={{
//                 lineColor: 'blue',
//                 lineWidth: 5,
//               }}
//             />
//           </ShapeSource>
//         )}
//       </Mapbox.MapView>
//     </View>
//   );
// }

// export default RoadRoute;


import Mapbox, { ShapeSource, LineLayer } from '@rnmapbox/maps';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const access_tokenn =
  "pk.eyJ1IjoibWVodWx0YXR2YSIsImEiOiJjbWF3OXF2bzYwOTlvMm1zNXExdzR2cjN6In0.NJITQ-NOheowbtBZ8N_41Q";

Mapbox.setAccessToken(access_tokenn);

function RoadRoute() {
  const [routes, setRoutes] = useState([]);

  // Thaltej Hinglaj Complex → TatvaSoft House, Ahmedabad
  const origin = [72.510642, 23.050143];
  const destination = [72.5005268, 23.0346686];

  useEffect(() => {
    const fetchRoutes = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&alternatives=true&access_token=${access_tokenn}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data===",data);
        
        if (data.routes && data.routes.length > 0) {
          const routeFeatures = data.routes.map((r, index) => ({
            type: 'Feature',
            id: `route-${index}`,
            geometry: r.geometry,
          }));
          setRoutes(routeFeatures);
        }
      } catch (err) {
        console.error('Error fetching routes:', err);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView styleURL='mapbox://styles/mapbox/satellite-streets-v12' style={{ flex: 1 }}>
        <Mapbox.Camera zoomLevel={13} centerCoordinate={origin} />

        {routes.map((route, index) => (
          <ShapeSource key={route.id} id={`routeSource-${index}`} shape={route}>
            <LineLayer
              id={`routeLine-${index}`}
              style={{
                lineColor: index === 0 ? 'blue' : 'red', // main route blue, alternatives gray
                lineWidth: index === 0 ? 5 : 3,
                lineOpacity: index === 0 ? 1 : 0.5,
              }}
            />
          </ShapeSource>
        ))}
      </Mapbox.MapView>
    </View>
  );
}

export default RoadRoute;
