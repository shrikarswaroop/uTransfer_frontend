import { createContext } from "react";

const UserDeviceDataContext = createContext({deviceData:0, setDeviceData:(data)=>{}});
export default UserDeviceDataContext;