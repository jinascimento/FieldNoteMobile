import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Modal, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Geolocation from '@react-native-community/geolocation';

import {
  Container,
  ContainerModal,
  AnnotationContainer,
  AnnotationText,
  CardData,
  TitleField,
  Title,
  ButtonClose,
} from './styles';
import getRealm from '../../services/realm';

MapboxGL.setAccessToken(process.env.MAP_BOX_TOKEN);

function Main({ isFocused }) {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [annotationTargetModal, setAnnotationTargetModal] = useState({});
  const [displayModal, setDisplayModal] = useState(false);

  function triggerModal(isDisplay, annotation = {}) {
    setAnnotationTargetModal(annotation);
    setDisplayModal(isDisplay);
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
          <AnnotationText onPress={() => triggerModal(true, annotation)}>
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
    <Container>
      <Modal visible={displayModal} animationType="slide">
        <ContainerModal>
          <Title>Dados da anotação realizada</Title>
          <ButtonClose title="Fechar" onPress={() => triggerModal(false)} />
          <CardData>
            <TitleField>Descrição:</TitleField>
            <Text>{annotationTargetModal.description}</Text>
            <TitleField>Data e hora:</TitleField>
            <Text>{annotationTargetModal.noted_at}</Text>
          </CardData>
        </ContainerModal>
      </Modal>
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
