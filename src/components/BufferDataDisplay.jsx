import { Box, Paper, Typography, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState, useContext } from "react";
import BufferReceiverContext from "../contexts/BufferReceiverContext";
import RefreshDeviceDisplayContext from "../contexts/RefreshDeviceDisplayContext";
import endpoints from "../endpoints";
import axios from "axios";
import Alert from '@mui/material/Alert';

function BufferDataDisplay({ height, width }) {
    const [activeDisplay, setActiveDisplay] = useState('write');
    const writtenMessage = useRef('');
    const { bufferReceiverId, setBufferReceiverId } = useContext(BufferReceiverContext);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState('');
    const [failureAlertOpen, setFailureAlertOpen] = useState(false);
    const [failureAlertMessage, setFailureAlertMessage] = useState('');
    const [sendDisabled, setSendDisabled] = useState(false);
    const [bufferMessage, setBufferMessage] = useState('');
    const { setRefreshDeviceDisplay } = useContext(RefreshDeviceDisplayContext);

    const readMessage = async () => {
        try {
            setBufferMessage('');
            let response = await axios.get(
                endpoints.READ_MESSAGE,
                {
                    params: {
                        userId: window.sessionStorage.getItem("userId"),
                        readerId: window.sessionStorage.getItem("deviceId"),
                        sourceId: bufferReceiverId
                    }
                }
            );
            if(response.data.message==='dne') {
                setFailureAlertOpen(false);
                setFailureAlertMessage('No message history!');
                setFailureAlertOpen(true);
            } else if (response.status === 200) {
                setBufferMessage(response.data.message);
                setRefreshDeviceDisplay(true);
            } else {
                setFailureAlertOpen(false);
                setFailureAlertMessage('An error occured, try again later!');
                setFailureAlertOpen(true);
            }
        } catch (error) {
            console.log('error');
            setFailureAlertOpen(false);
            setFailureAlertMessage('An error occured, try again later!');
            setFailureAlertOpen(true);
        }
    }

    const sendMessage = async () => {
        setSendDisabled(true);
        try {
            let response = await axios.post(
                endpoints.SEND_MESSAGE,
                {
                    userId: window.sessionStorage.getItem("userId"),
                    senderId: window.sessionStorage.getItem("deviceId"),
                    receiverId: bufferReceiverId,
                    data: writtenMessage.current
                }
            );
            if (response.data.message === 'success') {
                setSuccessAlertOpen(false);
                setSuccessAlertMessage('Message sent!');
                setSuccessAlertOpen(true);
            } else {
                setFailureAlertOpen(false);
                setFailureAlertMessage('An error occured, try again later!');
                setFailureAlertOpen(true);
            }
        } catch (error) {
            // console.log(error);
            setFailureAlertOpen(false);
            setFailureAlertMessage('An error occured, try again later!');
            setFailureAlertOpen(true);
        }
        setSendDisabled(false);
    };

    return (
        <Box
            sx={{
                width: `${width}%`,
                height: `${height}%`,
                marginY: 'auto',
                backgroundColor: '#C7F2FF',
                borderRadius: 3,
                padding: 3,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    border: '4px solid #0192BF',
                    borderRadius: 3
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '10%',
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            flexGrow: 1,
                            borderRadius: 0,
                            borderTopLeftRadius: 8,
                            backgroundColor: (activeDisplay === 'read' ? '#01B6EF' : '#0192BF'),
                            display: 'flex',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            ":hover": {
                                filter: (activeDisplay === 'read' ? 'brightness(100%)' : 'brightness(90%)')
                            }
                        }}
                        onClick={() => { setActiveDisplay('read'); readMessage(); }}
                    >
                        <Typography
                            sx={{
                                width: '100%',
                                marginY: 'auto',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.5rem'
                            }}
                        >
                            READ
                        </Typography>
                    </Paper>
                    <Paper
                        elevation={0}
                        sx={{
                            flexGrow: 1,
                            borderRadius: 0,
                            borderTopRightRadius: 8,
                            backgroundColor: (activeDisplay === 'write' ? '#01B6EF' : '#0192BF'),
                            display: 'flex',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            ":hover": {
                                filter: (activeDisplay === 'write' ? 'brightness(100%)' : 'brightness(90%)')
                            }
                        }}
                        onClick={() => { setActiveDisplay('write') }}
                    >
                        <Typography
                            sx={{
                                width: '100%',
                                marginY: 'auto',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.5rem'
                            }}
                        >
                            WRITE
                        </Typography>
                    </Paper>
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        boxSizing: 'border-box',
                        height: '50%',
                        width: '80%',
                        marginTop: '10%',
                        marginLeft: '10%',
                        backgroundColor: '#F5F5F5',
                        border: '3px solid #E4E4E4',
                        borderRadius: 2,
                        overflow: 'scroll',
                        padding: '10px',
                        '@media (max-width: 800px)': {
                            height: '60%'
                        }

                    }}
                >
                    {activeDisplay === 'write' &&
                        <TextField
                            sx={{ width: '100%' }}
                            multiline
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            inputProps={{ style: { color: '#696969' } }}
                            placeholder="Type your message here..."
                            onChange={(evt) => { writtenMessage.current = evt.target.value; }}
                        />
                    }
                    {activeDisplay === 'read' &&
                        <Typography
                            sx={{ width: '100%', color: '#696969' }}
                        >
                            {bufferMessage}
                        </Typography>
                    }
                </Paper>
                {activeDisplay === 'write' ?
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            float: 'right',
                            marginRight: '10%',
                            marginTop: '20px',
                            backgroundColor: '#FAFF00',
                            border: '2px solid #BABE00',
                            borderRadius: 3,
                            color: '#BABE00',
                            fontWeight: 'bold',
                            ":hover": {
                                backgroundColor: '#FAFF00',
                                border: '2px solid #BABE00',
                                color: '#BABE00'
                            },
                            ":active": {
                                backgroundColor: '#BABE00',
                                border: '2px solid #FAFF00',
                                color: '#FAFF00',
                            }
                        }}
                        onClick={sendMessage}
                        disabled={sendDisabled}
                    >
                        SEND
                    </Button>
                    :
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            float: 'right',
                            marginRight: '10%',
                            marginTop: '20px',
                            backgroundColor: '#FFB800',
                            border: '2px solid #AC7B00',
                            borderRadius: 3,
                            color: '#AC7B00',
                            fontWeight: 'bold',
                            ":hover": {
                                backgroundColor: '#FFB800',
                                border: '2px solid #AC7B00',
                                color: '#AC7B00',
                            },
                            ":active": {
                                backgroundColor: '#AC7B00',
                                border: '2px solid #FFB800',
                                color: '#FFB800',
                            }

                        }}
                    >
                        COPY
                    </Button>
                }
            </Paper>
            {successAlertOpen &&
                <Alert
                    sx={{ marginTop: '50px' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setSuccessAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {successAlertMessage}
                </Alert>
            }
            {failureAlertOpen &&
                <Alert
                    severity='error'
                    sx={{ marginTop: '50px' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setFailureAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {failureAlertMessage}
                </Alert>
            }
        </Box>
    );
}

export default BufferDataDisplay;