import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const AnnotationContainer = styled.View.attrs(props => ({
  backgroundColor: props.synced ? '#fc6663' : '#11bf50'
}))`
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 5px;
`;

export const AnnotationText = styled.Text`
  font-size: 14px;
  color: #fff;
`;
