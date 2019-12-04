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

export const CardData = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TitleField = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  align-self: center;
`;

export const ButtonClose = styled.Button`

`;

export const ContainerModal = styled.View`
  flex: 1;
  background-color: rgba(11, 312, 139, 0.6);
  align-items: center;
`;
