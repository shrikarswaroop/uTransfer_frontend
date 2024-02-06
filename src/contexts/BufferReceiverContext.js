import { createContext } from "react";

const BufferReceiverContext = createContext({bufferReceiverId : 0, setBufferReceiverId:(ind)=>{}});
export default BufferReceiverContext;
