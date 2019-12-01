import { Platform, } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 30px;
  border: 0;
  border-bottom-color: #ede8f7;
  border-bottom-width: 2px;
  color: #2f76b4;
  &:focus {
    border-bottom-color: 38aeff;
  }
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: rgba(24,141,64,0.98);
  border-radius: 20px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
