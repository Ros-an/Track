import { userInfo } from "os";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { globalReducer } from "../reducer/globalReducer";
import { UserInfo } from "../interfaces/global.interface";
import axios from "axios";
import { useRouter } from "next/router";

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
};

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(userInfo),
      });
    }
  }, []);
  //this is used to intercept every request response, and check whether its a authorized or not
  axios.interceptors.response.use(
    function (res) {
      // if status code is within the range of 2xx, this function will be triggered
      return res;
    },
    function (error) {
      // if status code is outside the range of 2xx, then this function will be triggered
      const res = error.response;
      // 401 - unauthorized user
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("Unauthorized access 401 > Logout!");
              dispatch({
                type: "LOGOUT",
              });
              localStorage.removeItem("user");
              router.push("/join/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useCustomGlobalContext = () => {
  return useContext(GlobalContext);
};
export default GlobalContextProvider;
