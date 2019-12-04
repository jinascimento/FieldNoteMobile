import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
  const annotations = useSelector(state => state.annotation.annotations);
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
    const notedAt = new Date();
    notedAt.setHours(notedAt.getHours() - 3);

    const data = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description,
      noted_at: notedAt,
    };
    const realm = await getRealm();
    if (description) {
      try {
        await api.post('/api/v1/annotations', {
          data,
        });
        data.synced = true;
        realm.write(() => {
          realm.create('Annotation', data);
        });
      } catch (e) {
        data.id = annotations.length + 1;
        data.synced = false;
        realm.write(() => {
          realm.create('Annotation', data);
        });
      }
    } else {
      Alert.alert(
          'Erro',
          'Houve um erro ao salvar a anotação, verifique se foi preenchido corretamente!'
      );
    }

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
