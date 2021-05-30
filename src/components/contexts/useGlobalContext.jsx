import React, {createContext, useContext, useReducer} from 'react'

const globalContext = createContext();

const initialState = {
    user : {
        userName : "",
        password : "",
        loginAs : "Employer",
        loginSuccess : true
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_VALUE' : {
            return {
                ...state,
                user : {
                    ...state.user,
                    [action.field] : action.value

                }
            }
        }

        case 'SUCCESS' : {
            return {
                ...state,
                user : {
                    ...state.user,
                    loginSuccess : true
                }
            }
        }

        case 'FAILURE' : {
            return {
                ...state,
                user : {
                    ...state.user,
                    loginSuccess : false
                }
            }
        }
        default : return state
    }
}

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const context = [state, dispatch];
    return (<globalContext.Provider value={context}>
        {children}
    </globalContext.Provider>)
}

export const useGlobalContext = () => {
    return useContext(globalContext)
}