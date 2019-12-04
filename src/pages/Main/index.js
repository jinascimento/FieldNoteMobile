import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Geolocation from '@react-native-community/geolocation';

import AnnotationModal from '../../components/AnnotationModal';
import { Container, AnnotationContainer, AnnotationText } from './styles';
import getRealm from '../../services/realm';

MapboxGL.setAccessToken(process.env.MAP_BOX_TOKEN);

function Main({ isFocused }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [annotationModal, setAnnotationModal] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  function triggerModal(annotation) {
    setDisplayModal(true);
    setAnnotationModal(annotation);
  }

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
        <AnnotationContainer synced={annotation.synced === false}>
          <AnnotationText onPress={() => triggerModal(annotation)}>
            o
          </AnnotationText>
        </AnnotationContainer>
      </MapboxGL.PointAnnotation>
    ));
  }

  useEffect(() => {
    async function loadAnnotations() {
      const realm = await getRealm();
      if (isFocused) {
        const annotation = realm.objects('Annotation');
        setAnnotations(annotation);
      }
    }
    loadAnnotations();
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
    <>
      <AnnotationModal
        description={annotationModal.description || ''}
        date={annotationModal.noted_at || new Date().toString()}
        display={displayModal}
      />
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
    </>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

Main.propTypes = {
  isFocused: PropTypes.func.isRequired,
};

export default withNavigationFocus(Main);
