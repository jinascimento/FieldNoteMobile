import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';

import {
  Form,
  FormInput,
  SubmitButton,
  SubmitButtonText,
  Title,
} from './styles';
import Layout from '../../components/Layout';

export default function Signin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleAuthenticate() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Layout>
      <Title>Anotações de Campo</Title>

      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu email"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Digite sua senha"
          returnKeyType="send"
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton onPress={handleAuthenticate}>
          <SubmitButtonText>Acessar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Layout>
  );
}
