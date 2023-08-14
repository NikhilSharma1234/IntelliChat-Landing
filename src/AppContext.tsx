import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userVerified, setUserVerified] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);

  return (
    <UserContext.Provider
      value={[userVerified, setUserVerified, userRegistered, setUserRegistered, userSignedIn, setUserSignedIn]}>
      {children}
    </UserContext.Provider>
  );
}