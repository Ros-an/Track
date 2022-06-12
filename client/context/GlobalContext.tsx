import { userInfo } from 'os';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import {globalReducer} from "../reducer/globalReducer";
import { UserInfo } from '../interfaces/global.interface';

export interface StateInterface {
    user: UserInfo | null;
}
export interface GlobalContextInterface {
    state: StateInterface;
    dispatch: React.Dispatch<any>;
}
const GlobalContext = createContext({} as GlobalContextInterface);
const initialState: StateInterface = {
    user: null,
}

function GlobalContextProvider({children}:{children: ReactNode}) {
    const [state, dispatch ] = useReducer(globalReducer, initialState);
    
    useEffect(()=>{
        const userInfo = localStorage.getItem("user");
        if(userInfo){
            dispatch({
                type: "LOGIN",
                payload: JSON.parse(userInfo)
            })
        }
    },[])
    
  return (
    <GlobalContext.Provider value={{state, dispatch}}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useCustomGlobalContext = () => {
    return useContext(GlobalContext);
}
export default GlobalContextProvider