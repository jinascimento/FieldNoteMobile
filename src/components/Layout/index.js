import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

Layout.prototype = {
  children: PropTypes.element.isRequired,
};

export default Layout;
