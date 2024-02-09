'use client'

import { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie'

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: null,
  setToken: () => {},
  alertMessage: {},
  setAlertMessage: () => {},
  loading: false,
  setLoading: () => {},
})

export const ContextProvider = ({children}) => {
  let cookieUser = null
  
  try {
    cookieUser = JSON.parse(Cookies.get('user'));
  } catch (error) {
    if (error instanceof SyntaxError) {
      //console.error('Invalid JSON:', error.message)
    }
  }

  //console.log('UUUUUSSSSEEEEEEERRR')
  //console.log(cookieUser)

  const [user, _setUser] = useState(cookieUser && Object.keys(cookieUser).length === 0 ? null : cookieUser)
  const [token, _setToken] = useState(Cookies.get('ACCESS_TOKEN'))

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      Cookies.set('ACCESS_TOKEN', token)
    } else {
      Cookies.remove('ACCESS_TOKEN')
    }
  }

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      Cookies.set('user', JSON.stringify(user))
    } else {
      Cookies.remove('user')
    }
  }

  const [alertMessage, setAlertMessage] = useState({})
  const [loading, setLoading] = useState(false)
  
  return (
    <StateContext.Provider value={{ 
        user,
        token,
        setUser,
        setToken,
        alertMessage,
        setAlertMessage,
        loading,
        setLoading
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);