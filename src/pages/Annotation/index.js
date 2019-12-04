import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Keyboard, Alert } from 'react-native';
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
    const notedAt = new Date();
    notedAt.setHours(notedAt.getHours() - 3);

    const annotation = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      description,
      noted_at: notedAt,
    };
    const realm = await getRealm();
    if (description) {
      try {
        await api.post('/api/v1/annotations', {
          annotation,
        });
        annotation.synced = true;
        realm.write(() => {
          realm.create('Annotation', annotation);
        });
      } catch (e) {
        const annotations = realm.objects('Annotation');
        annotation.id = annotations.length + 1;
        annotation.synced = false;
        realm.write(() => {
          realm.create('Annotation', annotation);
        });

        Alert.alert('Sucesso!', 'Anotação realizada.');
      }
    } else {
      Alert.alert(
        'Erro',
        'Houve um erro ao salvar a anotação, verifique se foi preenchido corretamente!'
      );
    }
    setDescription('');
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
