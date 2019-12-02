import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Container, Title } from './styles';

import api from '../../services/api';

function Main({ isFocused }) {
  const [annotations, setAnnotations] = useState([]);

  async function loadAnnotations() {
    const response = await api.get('/api/v1/annotations');
    console.tron.log('load')
    setAnnotations(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAnnotations();
    }
  }, [isFocused]);

  return (
    <Container>
      <Title>Anotações de Campo</Title>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Anotações',
};

export default withNavigationFocus(Main);
