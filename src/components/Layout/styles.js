import styled from 'styled-components/native/dist/styled-components.native.esm';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background-color: rgba(156, 237, 191, 0.9);
  align-items: center;
  padding: 0 30px;
  margin-top: 40px;
`;
