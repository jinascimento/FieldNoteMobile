import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Modal } from 'react-native';

import { Container, Text, TitleField, Title, CardData, ButtonClose, ButtonCloseText } from './styles';

function AnnotationModal(props) {
  const { description, date, display } = props;
  const [visible, setVisible] = useState(false);

  return (
    <Modal
      visible={props.display}
      animationType="slide"
      onRequestClose={() => visible}
    >
      <Container>
        <Title>Dados da anotação realizada</Title>
        <ButtonClose title={"Fechar"} onPress={() => setVisible(false)} >
          {/*<ButtonCloseText>adad</ButtonCloseText>*/}
        </ButtonClose>
        <CardData>
          <TitleField>Descrição:</TitleField>
          <Text>{description}</Text>
          <TitleField>Data e hora:</TitleField>
          {/* TODO: Formatar data */}
          <Text>{date}</Text>
        </CardData>
      </Container>
    </Modal>
  );
}

AnnotationModal.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default AnnotationModal;
