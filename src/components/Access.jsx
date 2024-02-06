import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import ActionIndexContext from '../contexts/ActionIndexContext';
import { useContext, useRef } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import endpoints from '../endpoints';
import { useNavigate } from 'react-router-dom';

function Access() {
    const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = React.useState('');
    const [failureAlertOpen, setFailureAlertOpen] = React.useState(false);
    const [failureAlertMessage, setFailureAlertMessage] = React.useState('');
    const navigate = useNavigate();

    const actionNames = ["ADD DEVICE", "LOGIN", "SIGN UP"];
    const userId = useRef();
    const deviceId = useRef();
    const deviceName = useRef();
    const password = useRef();
    const { actionIndex, setActionIndex } = useContext(ActionIndexContext);

    const signUp = async () => {
        try {
            let userIdRegex = /^[A-Za-z]{1}[0-9A-Za-z]{7,64}$/;
            let passwordRegex = /^.{8,64}$/;
            if (userIdRegex.test(userId.current) === false) {
                setFailureAlertOpen(false);
                setFailureAlertMessage('Username must begin with an alphabet, can only contain alphabets & numbers and must be atleast 8 characters long.');
                setFailureAlertOpen(true);
                return;
            }
            if (passwordRegex.test(password.current) === false) {
                setFailureAlertOpen(false);
                setFailureAlertMessage('Password must be atleast 8 characters long.');
                setFailureAlertOpen(true);
                return;
            }
            let response = await axios.post(endpoints.SIGNUP, { userId: userId.current, password: password.current });
            if (response.data.message === 'success') {
                setSuccessAlertOpen(false);
                setSuccessAlertMessage('Sign Up Successful! First time? Add a device!')
                setSuccessAlertOpen(true);
            } else {
                setFailureAlertOpen(false);
                setFailureAlertMessage(response.data.message);
                setFailureAlertOpen(true);
            }
        } catch (error) {
            setFailureAlertOpen(false);
            setFailureAlertMessage('An error occured, try again later...');
            setFailureAlertOpen(true);
        }
    }

    const login = async () => {
        try {
            let response = await axios.post(endpoints.LOGIN,
                {
                    userId: userId.current,
                    password: password.current,
                    deviceId: deviceId.current,
                });
            if (response.data.message === 'success') {
                setSuccessAlertOpen(false);
                setSuccessAlertMessage('Login Successful! Redirecting...')
                setSuccessAlertOpen(true);
                setTimeout(() => {
                    window.sessionStorage.setItem('userId', userId.current);
                    window.sessionStorage.setItem('deviceId', deviceId.current);
                    navigate('/core');
                }, 1000);
            } else {
                setFailureAlertOpen(false);
                setFailureAlertMessage(response.data.message);
                setFailureAlertOpen(true);
            }
        } catch (error) {
            setFailureAlertOpen(false);
            setFailureAlertMessage('An error occured, try again later...');
            setFailureAlertOpen(true);
        }
    }

    const addDevice = async () => {
        try {
            let regex = /^[A-Za-z0-9]{3,64}$/;
            if (regex.test(deviceId.current) === false) {
                console.log('id');
                setFailureAlertOpen(false);
                setFailureAlertMessage('Device ID can only contain alphabets & numbers and must be atleast 3 characters long.');
                setFailureAlertOpen(true);
                return;
            }
            if(regex.test(deviceId.name) === false) {
                console.log('name');
                setFailureAlertOpen(false);
                setFailureAlertMessage('Device name can only contain alphabets & numbers and must be atleast 3 characters long.');
                setFailureAlertOpen(true);
                return;
            }
            let response = await axios.post(endpoints.ADD_DEVICE,
                {
                    userId: userId.current,
                    password: password.current,
                    deviceId: deviceId.current,
                    deviceName: deviceName.current
                });
            if (response.data.message === 'success') {
                setSuccessAlertOpen(false);
                setSuccessAlertMessage('Added device successfully!')
                setSuccessAlertOpen(true);
            } else {
                setFailureAlertOpen(false);
                setFailureAlertMessage(response.data.message);
                setFailureAlertOpen(true);
            }
        } catch (error) {
            console.log(error);
            setFailureAlertOpen(false);
            setFailureAlertMessage('An error occured, try again later...');
            setFailureAlertOpen(true);
        }
    }

    const submitCallbacks = [addDevice, login, signUp];
    const nextAction = () => {
        setActionIndex((actionIndex + 1) % 3);
        userId.current = '';
    }

    const previousAction = () => {
        setActionIndex(actionIndex === 0 ? 2 : (actionIndex - 1));
    }

    const actions = {
        "LOGIN": {
            boxHeight: 70,
            inputs: [
                { name: "User ID", callback: (evt) => { userId.current = evt.target.value } },
                { name: "Device ID", callback: (evt) => { deviceId.current = evt.target.value } },
                { name: "Password", callback: (evt) => { password.current = evt.target.value } }
            ]
        },
        "SIGN UP": {
            boxHeight: 50,
            inputs: [
                { name: "User ID", callback: (evt) => { userId.current = evt.target.value } },
                { name: "Password", callback: (evt) => { password.current = evt.target.value } }
            ]
        },
        "ADD DEVICE": {
            boxHeight: 80,
            inputs: [
                { name: "User ID", callback: (evt) => { userId.current = evt.target.value } },
                { name: "Device ID", callback: (evt) => { deviceId.current = evt.target.value } },
                { name: "Device Name", callback: (evt) => { deviceName.current = evt.target.value } },
                { name: "Password", callback: (evt) => { password.current = evt.target.value } }
            ]
        }
    }

    return (
        <Paper
            elevation={2}
            sx={{
                height: '50vh',
                width: '30vw',
                marginX: 'auto',
                marginTop: '15vh',
                border: '3px solid #01B6EF',
                borderRadius: 2,
                '@media (max-height:700px)': {
                    height: '400px'
                },
                '@media (min-width:801px) and (max-width:1200px)': {
                    width: '40vw'
                },
                '@media (min-width:601px) and (max-width:800px)': {
                    width: '60vw'
                },
                '@media (max-width: 600px)': {
                    width: '90vw'
                }
            }} >
            <Paper
                elevation={0}
                sx={{
                    height: '10%',
                    width: '100%',
                    backgroundColor: '#01B6EF',
                    borderRadius: 0
                }}
            >
                <Box sx={{ display: 'flex', width: '100%', height: '100%', verticalAlign: 'middle' }}>
                    <IconButton sx={{ flexGrow: 1, float: 'left' }} onClick={previousAction}>
                        <KeyboardDoubleArrowLeft sx={{ color: '#C7F2FF', width: '30px', fontSize: '10rem' }} />
                    </IconButton>
                    <Typography sx={{
                        flexGrow: 10,
                        fontSize: '1.5em',
                        color: '#C7F2FF',
                        fontWeight: 'bold',
                        fontFamily: 'Verdana',
                        marginY: 'auto'
                    }}
                        align={'center'}>
                        {actionNames[actionIndex]}
                    </Typography>
                    <IconButton sx={{ flexGrow: 1, float: 'right' }} onClick={nextAction}>
                        <KeyboardDoubleArrowRight sx={{ color: '#C7F2FF', width: '30px', fontSize: '10rem' }} />
                    </IconButton>
                </Box>
            </Paper>
            <Paper
                elevation={0}
                sx={{
                    height: '80%',
                    width: '90%',
                    backgroundColor: '#F5F5F5',
                    marginX: '5%',
                    marginY: '5%',
                    border: '2px solid #D9D9D9',
                    borderRadius: 2
                }}
            >
                <Box sx={{
                    height: `${actions[actionNames[actionIndex]].boxHeight}%`,
                    marginTop: `${(100 - actions[actionNames[actionIndex]].boxHeight) / 2}%`,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    verticalAlign: 'middle',
                }}>
                    {actions[actionNames[actionIndex]].inputs.map((item, index) => (
                        <TextField
                            label={item.name}
                            key={`${item.name}${actionIndex}`}
                            size='small'
                            defaultValue={''}
                            onChange={item.callback}
                            type={index === actions[actionNames[actionIndex]].inputs.length - 1 ? 'password' : 'text'}
                            sx={{
                                flexGrow: 1,
                                width: '80%',
                                marginLeft: '10%',
                                marginY: 'auto',
                                backgroundColor: '#F5F5F5',
                            }}
                        />
                    ))}
                    <Button
                        variant='contained'
                        size='small'
                        sx={{
                            flexGrow: 1,
                            width: '80%',
                            marginLeft: '10%',
                            marginY: 'auto',
                            fontWeight: 'bold'
                        }}
                        onClick={submitCallbacks[actionIndex]}
                    >
                        {actionNames[actionIndex]}
                    </Button>
                </Box>
            </Paper>
            <Collapse in={successAlertOpen}

            >
                <Alert

                    sx={{ mt: '10px', border: '1px solid #D9D9D9' }}
                    size='small'
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
            </Collapse>
            <Collapse in={failureAlertOpen}

            >
                <Alert
                    severity='error'
                    sx={{ mt: '10px', border: '1px solid #D9D9D9' }}
                    size='small'
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
            </Collapse>
        </Paper>
    );
}

export default Access;