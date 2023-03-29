import PropTypes from 'prop-types';
import React from 'react';

function InvalidMsg({ message, testId }) {
  return <p data-testid={ `common_register__invalid-${testId}` }>{message}</p>;
}

InvalidMsg.propTypes = {
  message: PropTypes.any,
  testId: PropTypes.any,
}.isRequired;
export default InvalidMsg;
