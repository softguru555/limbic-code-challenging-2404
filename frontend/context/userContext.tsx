import React from 'react';
import { createContext } from 'react';

export const MyContext = createContext(null);


export const MyProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [colorMode, setColorMode] = React.useState('light');
  return <MyContext.Provider
    value={{
      token,
      setToken,
      userInfo,
      setUserInfo,
      users,
      setUsers
    }}>
    {children
    }

  </MyContext.Provider>
}


export const useGlobalContext = () => {
  return React.useContext(MyContext);
}