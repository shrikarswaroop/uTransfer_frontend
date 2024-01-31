import { createContext } from "react";

const ActionIndexContext = createContext({actionIndex : 0, setActionIndex:(ind)=>{}});
export default ActionIndexContext;
