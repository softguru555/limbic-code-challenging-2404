import React from 'react';
import { createContext } from 'react';

export const ColorContext = createContext(null);

export const ColorProvider = ({ children }) => {
  const [colorMode, setColorMode] = React.useState('dark');
  return <ColorContext.Provider
    value={{
      colorMode,
      setColorMode
    }}>
    {children
    }

  </ColorContext.Provider>
}

export const useGlobalContext = () => {
  return React.useContext(ColorContext);
}