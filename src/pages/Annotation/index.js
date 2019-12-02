import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, TextInput } from 'react-native';
import {
  Container,
  Form,
  inputTextArea,
  SubmitButton,
  SubmitButtonText,
  Title,
} from './styles';

import api from '../../services/api';

export default function Annotation({ navigation }) {
  const [description, setDescription] = useState([]);

  async function handleAddAnnotation() {
    try {
      await api.post('/api/v1/annotations', {
        latitude: -21.224535,
        longitude: -43.771443,
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

        <SubmitButton onPress={handleAddAnnotation}>
          <SubmitButtonText>Anotar</SubmitButtonText>
        </SubmitButton>
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
