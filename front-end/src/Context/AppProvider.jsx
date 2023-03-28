import PropTypes from 'prop-types';
import { useMemo } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const teste = 'contexto';

  const contextValue = useMemo(() => ({ teste }), [teste]);
  return (
    <AppContext.Provider
      value={ contextValue }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
