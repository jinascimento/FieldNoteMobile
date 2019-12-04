import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getRealm from '../../services/realm';
import { Container, SubmitButton, SubmitButtonText, Title, ProgressBar } from './styles';

import api from '../../services/api';
import {
  CancelButton,
  ContainerButton,
  Form,
  inputTextArea,
} from '../Annotation/styles';

export default function SyncAnnotation({ navigation }) {
  const [annotationsToSync, setAnnotationsToSync] = useState([]);

  useEffect(() => {
    async function loadAnnotations() {
      const realm = await getRealm();
      const annotation = realm.objects('Annotation');
      setAnnotationsToSync(annotation);
    }

    loadAnnotations();
  }, []);

  async function handleSync() {
    console.tron.log('sincronizar');
  }

  return (
    <Container>
      <Title>Sincronize suas anotações com a base de dados</Title>

      <Form>
        <ProgressBar>
          <Title>Sincronize suas anotações com a base de dados</Title>
        </ProgressBar>
        <ContainerButton>
          <SubmitButton onPress={handleSync}>
            <SubmitButtonText>Sincronizar</SubmitButtonText>
          </SubmitButton>
        </ContainerButton>
      </Form>
    </Container>
  );
}

SyncAnnotation.navigationOptions = {
  title: 'Sincronizar',
};

SyncAnnotation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
