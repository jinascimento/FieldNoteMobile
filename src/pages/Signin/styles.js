import { Platform, } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Form = styled.View`
  align-self: stretch;
  margin-top: 300px;
  justify-content: space-around;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 30px;
  border: 0;
  border-bottom-color: #2b2b2b;
  border-bottom-width: 2px;
  font-size: 16px;
  color: #2f76b4;
  &:focus {
    border-bottom-color: 38aeff;
  }
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: rgb(254,252,252);
  border-radius: 20px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px;
  color: rgba(0,0,0,0.97);
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #000000;
  font-weight: bold;
  font-family: Helvetica;
  align-self: center;
  margin-top: 50px;
`;
