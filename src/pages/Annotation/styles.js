import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 30px;
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  align-self: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 100px;
`;

export const inputTextArea = StyleSheet.create({
  textInputStyle: {
    marginBottom: 30,
    borderColor: '#ede8f7',
    color: '#2f76b4',
  },
});

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: rgba(24, 141, 64, 0.98);
  border-radius: 20px;
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
