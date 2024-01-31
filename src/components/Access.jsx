import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import ActionIndexContext from '../contexts/ActionIndexContext';
import { useContext } from 'react';

function Access() {
    const actionNames = ["ADD DEVICE", "LOGIN", "SIGN UP"];
    const {actionIndex, setActionIndex} = useContext(ActionIndexContext);

    const nextAction = () => {
        setActionIndex((actionIndex + 1) % 3);
    }

    const previousAction = () => {
        setActionIndex(actionIndex === 0 ? 2 : (actionIndex - 1));
    }

    const actions = {
        "LOGIN": {
            boxHeight: 70,
            inputs: [
                "User ID",
                "Device ID",
                "Password"
            ]
        },
        "SIGN UP": {
            boxHeight: 50,
            inputs: [
                "User ID",
                "Password"
            ]
        },
        "ADD DEVICE": {
            boxHeight: 80,
            inputs: [
                "User ID",
                "Device ID",
                "Device Name",
                "Password"
            ]
        }
    }

    return (
        <Paper
            elevation={2}
            sx={{
                height:'50vh',
                width: '30vw',
                marginX: 'auto',
                marginTop:'15vh',
                border: '3px solid #01B6EF',
                borderRadius: 2,
                '@media (max-height:700px)': {
                    height:'400px'
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
                            label={item}
                            key={item}
                            size='small'
                            type={index === actions[actionNames[actionIndex]].inputs.length - 1 ? 'password' : 'text'}
                            sx={{
                                flexGrow:1,
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
                            flexGrow:1,
                            width: '80%',
                            marginLeft: '10%',
                            marginY: 'auto',
                            fontWeight:'bold'
                        }}
                    >
                        {actionNames[actionIndex]}
                    </Button>
                </Box>
            </Paper>
        </Paper>
    );
}

export default Access;