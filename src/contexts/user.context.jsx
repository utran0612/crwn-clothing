import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

//build userReducer function to feed into the useReducer() hook
const userReducer = (state, action) => {
  const {type, action} = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser:payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  //use useReducer instead of useState
  //useReducer() return a state object and a dispatch function
  // state contain the state (or value) of the object/var
  // dispatch is a function so we can set state changes (this is like setCurrentUser)
  const [{currentUser}, dispatch] = useReducer(userReducer,INITIAL_STATE)
  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER,payload:currentUser})
  }

  useEffect(() => {
    // onAuthStateChanged provided by firebase gives an user object. Thats why we have user there
    const unsubscribe = onAuthStateChangedListener((user) => {
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
