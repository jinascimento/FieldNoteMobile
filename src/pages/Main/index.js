import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Container, Title } from './styles';

import api from '../../services/api';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

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
        <MapView
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0068,
            longitudeDelta: 0.0068,
          }}
          style={styles.map}
        >
          {}
        </MapView>
      )}
    </View>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

export default withNavigationFocus(Main);
