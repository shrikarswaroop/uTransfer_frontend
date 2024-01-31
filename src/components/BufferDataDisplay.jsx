import { Box, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";

function BufferDataDisplay({height, width}) {
    const [activeDisplay, setActiveDisplay] = useState('read');

    return (
        <Box
            sx={{
                width: `${width}%`,
                height: `${height}%`,
                marginY:'auto',
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
                        onClick={() => { setActiveDisplay('read') }}
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
                        '@media (max-width: 800px)': {
                            height:'60%'
                        }
                    }}
                >

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
                                backgroundColor: '#BABE00',
                                border: '2px solid #FAFF00',
                                color: '#FAFF00',
                            }
                        }}
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
        </Box>
    );
}

export default BufferDataDisplay;