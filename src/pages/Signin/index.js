import React from 'react';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const Signin = () => {
  return (
    <Container>
      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu email"
          returnKeyType="next"
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Digite sua senha"
          returnKeyType="send"
        />

        <SubmitButton>
          <SubmitButtonText>Acessar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Signin;
