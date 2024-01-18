import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    alertMessage: '',
    setAlertMessage: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN')); 
    
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }

    const [alertMessage, _setAlertMessage] = useState('');

    const setAlertMessage = (message) => {
        _setAlertMessage(message);
    }

    return (
        <StateContext.Provider value={{ 
            user,
            token,
            setUser,
            setToken,
            alertMessage,
            setAlertMessage,
        }}>
            {children}
        </StateContext.Provider >
    )
}

export const useStateContext = () => useContext(StateContext);