import React, { useEffect, useState } from 'react';
import { Container, Title } from './styles';

import api from '../../services/api';

function Main() {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    async function loadAnnotations() {
      const response = await api.get('/api/v1/annotations');

      setAnnotations(response.data);
    }
    loadAnnotations();
  }, []);

  return (
    <Container>
      <Title>Anotações de Campo</Title>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

export default Main;
