import React from 'react';
import { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const delUser = async (id: any) => {
    const data = users.filter(element => element.id !== id);
    setUsers(data);
  }
  return <UserContext.Provider
    value={{
      token,
      setToken,
      userInfo,
      setUserInfo,
      users,
      setUsers,
      delUser
    }}>
    {children
    }
  </UserContext.Provider>
}


export const useGlobalContext = () => {
  return React.useContext(UserContext);
}