import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import getRealm from '../../services/realm';
import {
  Container,
  SubmitButton,
  SubmitButtonText,
  Title,
  ProgressBar,
} from './styles';

import api from '../../services/api';
import {
  ContainerButton,
  Form,
} from '../Annotation/styles';
import Layout from '../../components/Layout';

export default function SyncAnnotation({ navigation }) {
  const [annotationsToSync, setAnnotationsToSync] = useState([]);

  useEffect(() => {
    async function loadAnnotations() {
      const realm = await getRealm();
      const annotations = realm.objects('Annotation');
      const annotationsNotSync = annotations.filtered('synced = false');
      setAnnotationsToSync(annotationsNotSync);
    }

    loadAnnotations();
  }, []);

  function handleSync() {
    if (annotationsToSync.length === 0) {
      Alert.alert('Tudo ok!', 'Todas as anotações já estão sincronizadas');
    }

    annotationsToSync.forEach(async annotation => {
      const realm = await getRealm();
      try {
        await api.post('/api/v1/annotations', {
          annotation,
        });
        realm.write(() => {
          annotation.synced = true;
        });
        navigation.navigate('Main');
      } catch (e) {
        Alert.alert(
          'Erro',
          'Ocorreu um erro ao sincronizar, tente novamente mais tarde'
        );
      }

      Alert.alert('Successo!', 'Todas as anotações foram sincronizadas');
    });
  }

  return (
    <Layout>
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
    </Layout>
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
