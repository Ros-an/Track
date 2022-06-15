import { StateInterface } from "../context/GlobalContext";
export interface ActionInterface {
  payload?: any;
  type: string;
}

export function globalReducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
