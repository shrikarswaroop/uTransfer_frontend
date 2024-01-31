import { createContext } from "react";

const DeviceCheckmaskContext = createContext({checkmask:0, setCheckmask:(mask)=>{}});
export default DeviceCheckmaskContext;