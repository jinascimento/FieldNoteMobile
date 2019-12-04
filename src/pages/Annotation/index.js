import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Keyboard, Alert, NetInfo } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import getRealm from '../../services/realm';
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
    const data = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description,
    };
    const realm = await getRealm();
    await NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        try {
          api.post('/api/v1/annotations', {
            data,
          });
        } catch (e) {
          Alert.alert(
            'Erro',
            'Houve um erro ao salvar a anotação, verifique se foi preenchido corretamente!'
          );
        }
      } else {
        try {
          data.id = realm.objects('Annotation').length + 1;
          const notedAt = new Date();
          notedAt.setHours(notedAt.getHours() - 3);
          data.noted_at = notedAt;
          realm.write(() => {
            realm.create('Annotation', data);
          });
        } catch (e) {
          console.tron.log(e.message);
        }
      }
    });

    Keyboard.dismiss();
    navigation.navigate('Main');
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
