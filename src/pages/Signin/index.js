import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  handleNavigate = () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  handleAuthenticate = async () => {
    const { password, email } = this.state;

    try {
      await api.post('api/v1/sessions', {
        email,
        password,
      });

      this.handleNavigate();
    } catch (e) {
      console.tron.log('error');
    }
  };

  render() {
    const { email, password } = this.state;

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
            onChangeText={text => this.setState({ email: text })}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            returnKeyType="send"
            onChangeText={text => this.setState({ password: text })}
          />

          <SubmitButton onPress={this.handleAuthenticate}>
            <SubmitButtonText>Acessar</SubmitButtonText>
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
