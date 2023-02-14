import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // onAuthStateChanged provided by firebase gives an user object. Thats why we have user there
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        // move this from signInWithGoogle in sign-in-form component
        //so that we centralized all the user-related functions to one place => optimize performance
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    // React performs the cleanup when the component unmounts. (doc)
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
