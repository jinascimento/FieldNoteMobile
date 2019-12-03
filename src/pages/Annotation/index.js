import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  Container,
  Form,
  inputTextArea,
  SubmitButton,
  SubmitButtonText,
  CancelButton,
  ContainerButton,
  Title,
} from './styles';

import api from '../../services/api';

export default function Annotation({ navigation }) {
  const [description, setDescription] = useState([]);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates(coords);
    });
  }, []);

  function handleCancel() {
    setDescription('');
    navigation.navigate('Main');
  }

  async function handleAddAnnotation() {
    try {
      await api.post('/api/v1/annotations', {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        description,
      });
      navigation.navigate('Main');
    } catch (e) {
      Alert.alert(
        'Erro',
        'Houve um erro ao salvar a anotação, verifique se foi preenchido corretamente!'
      );
    }
  }

  return (
    <Container>
      <Title>Inserir Anotação</Title>

      <Form>
        <TextInput
          multiline
          style={inputTextArea.textInputStyle}
          numberOfLines={2}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Anotação"
          returnKeyType="next"
          value={description}
          onChangeText={setDescription}
        />
        <ContainerButton>
          <CancelButton onPress={handleCancel}>
            <SubmitButtonText>Cancelar</SubmitButtonText>
          </CancelButton>

          <SubmitButton onPress={handleAddAnnotation}>
            <SubmitButtonText>Anotar</SubmitButtonText>
          </SubmitButton>
        </ContainerButton>
      </Form>
    </Container>
  );
}

Annotation.navigationOptions = {
  title: 'Inserir anotação',
};

Annotation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
