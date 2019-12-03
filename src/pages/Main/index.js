import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import MapView from 'react-native-maps';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Geolocation from '@react-native-community/geolocation';
import { Container, Title } from './styles';

import api from '../../services/api';

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: '#7159c1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7159C1',
    transform: [{ scale: 0.8 }],
  },
});

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamluYXNjaW1lbnRvIiwiYSI6ImNrM3BjdHNhaDAxdTQzZHA1ODcwOHIzbmoifQ.t0lQl_VjL_5VrIf9luZJXw'
);

function Main() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates(coords);
        setLoading(false);
      },
      error => console.tron.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  async function loadAnnotations() {
    const response = await api.get('/api/v1/annotations');
    setAnnotations(response.data);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapboxGL.MapView
          centerCoordinate={[coordinates.longitude, coordinates.latitude]}
          style={styles.container}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Dark}
        >
          {}
        </MapboxGL.MapView>
      )}
    </View>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

export default withNavigationFocus(Main);
