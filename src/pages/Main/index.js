import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

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
    <View>
      <Text>
        {annotations.forEach(a => {
          console.tron.log(a);
        })}
      </Text>
    </View>
  );
}

Main.navigationOptions = {
  title: 'Anotações de Campo',
};

export default Main;
