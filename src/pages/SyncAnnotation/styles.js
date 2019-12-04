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
  justify-content: space-around;
  flex: 1;
`;

export const ProgressBar = styled.View`
  flex: 1;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubmitButton = styled(RectButton)`
  height: 46px;
  background: rgba(24, 141, 64, 0.98);
  border-radius: 20px;
  margin-top: 100px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
