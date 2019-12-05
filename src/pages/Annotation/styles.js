import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  align-self: center;
  font-family: Helvetica;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 100px;
  justify-content: space-around;
  flex: 1;
`;

export const inputTextArea = StyleSheet.create({
  textInputStyle: {
    borderColor: '#ede8f7',
    color: '#2f76b4',
    flex: 1,
  },
});

export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: rgb(254,252,252);
  border-radius: 20px;
  margin-top: 100px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  width: 48%;
`;

export const CancelButton = styled(RectButton)`
  height: 46px;
  background: rgba(200,53,65,0.98);
  border-radius: 20px;
  margin-top: 100px;
  margin-bottom: 40px;
  width: 48%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #000000;
  font-weight: bold;
`;
