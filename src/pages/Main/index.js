import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Geolocation from '@react-native-community/geolocation';
import { Container, AnnotationContainer, AnnotationText } from './styles';

import api from '../../services/api';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamluYXNjaW1lbnRvIiwiYSI6ImNrM3BjdHNhaDAxdTQzZHA1ODcwOHIzbmoifQ.t0lQl_VjL_5VrIf9luZJXw'
);

function Main() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [annotations, setAnnotations] = useState({});

  function renderAnnotations() {
    return annotations.map(annotation => (
      <MapboxGL.PointAnnotation
        id={annotation.id.toString()}
        coordinate={[
          parseFloat(annotation.longitude),
          parseFloat(annotation.latitude),
        ]}
        title={annotation.description}
      >
        <AnnotationContainer>
          <AnnotationText>{annotation.id.toString()}</AnnotationText>
        </AnnotationContainer>
        <MapboxGL.Callout
          title={annotation.description} style={{width: 152, height: 80}} />
      </MapboxGL.PointAnnotation>
    ));
  }

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

  useEffect(() => {
    async function loadAnnotations() {
      try {
        const response = await api.get('/api/v1/annotations');
        setAnnotations(response.data);
      } catch (e) {
        console.tron.log(e.message);
      }
    }

    loadAnnotations();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapboxGL.MapView
          centerCoordinate={[coordinates.longitude, coordinates.latitude]}
          style={{ flex: 1 }}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Dark}
        >
          {renderAnnotations()}
        </MapboxGL.MapView>
      )}
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

export default withNavigationFocus(Main);
