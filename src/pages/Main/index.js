import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Geolocation from '@react-native-community/geolocation';
import { annotationRequest } from '../../store/modules/annotation/actions';

import getRealm from '../../services/realm';
import { Container, AnnotationContainer, AnnotationText } from './styles';
import api from '../../services/api';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamluYXNjaW1lbnRvIiwiYSI6ImNrM3BjdHNhaDAxdTQzZHA1ODcwOHIzbmoifQ.t0lQl_VjL_5VrIf9luZJXw'
);

function Main({ isFocused }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const annotations = useSelector(state => state.annotation.annotations);

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
        <AnnotationContainer synced={true}>
          <AnnotationText>{'o'}</AnnotationText>
        </AnnotationContainer>
        <MapboxGL.Callout
          title={annotation.description}
          style={{ width: 152, height: 80 }} />
      </MapboxGL.PointAnnotation>
    ));
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(annotationRequest());
    }
  }, [isFocused]);

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

Main.propTypes = {
  isFocused: PropTypes.func.isRequired,
};

export default withNavigationFocus(Main);
