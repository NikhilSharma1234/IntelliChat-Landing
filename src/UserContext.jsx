import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPlan, setUserPlan] = useState('free');

  return (
    <UserContext.Provider value={{ userPlan, setUserPlan }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
