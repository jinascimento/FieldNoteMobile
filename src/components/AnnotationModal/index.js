import React from 'react';
import { Container, Text } from './styles';
import { Modal } from 'react-native';

const DisplayModal = props => (
  <Modal
    visible={true}
    animationType="slide"
    onRequestClose={() => console.log('closed')}
  >
    <Container>
      <Text>addsads</Text>
      <Text>addsads</Text>
      <Text>addsads</Text>
    </Container>
  </Modal>
);

export default DisplayModal;
