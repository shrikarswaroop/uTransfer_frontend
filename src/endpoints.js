const origin = "http://localhost:8000";

const endpoints = {
    SIGNUP : `${origin}/v1/auth/register`,
    ADD_DEVICE : `${origin}/v1/auth/add-device`,
    LOGIN : `${origin}/v1/auth/login`,
    DEVICES : `${origin}/v1/info/devices`,
    SEND_MESSAGE : `${origin}/v1/create/message`,
    READ_MESSAGE : `${origin}/v1/info/message`
}

export default endpoints;
