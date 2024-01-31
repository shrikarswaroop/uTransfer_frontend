import {
    Box,
    IconButton,
    Typography,
    Select,
    MenuItem,
    Paper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeviceDisplay from "./DeviceDisplay";


function SideBar({ isOpen, setOpen }) {

    const deviceData = [
        {
            "name": "MacBook",
            "id": "jack.macbook",
            "status": "dirty"
        },
        {
            "name": "Android",
            "id": "jack.android",
            "status": "clean"
        },
        {
            "name": "Windows",
            "id": "jack.windows",
            "status": "dirty"
        },
        {
            "name": "MacBook",
            "id": "jack.macbook",
            "status": "dirty"
        },
        {
            "name": "Android",
            "id": "jack.android",
            "status": "clean"
        },
        {
            "name": "Windows",
            "id": "jack.windows",
            "status": "dirty"
        }
    ]

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
            }}
        >

            {/* mobile */}
            {isOpen &&
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#C7F2FF',
                        height: '100%',
                        '@media (min-width: 800px)': {
                            visibility: 'collapse'
                        }
                    }}
                >
                    <IconButton sx={{ float: 'right' }} onClick={() => { setOpen(false) }}>
                        <CloseIcon />
                    </IconButton>
                    <Box
                        sx={{
                            height: '50px',
                            width: '84%',
                            marginLeft: '8%',
                            display: 'flex'
                        }}
                    >
                        <Box
                            sx={{
                                marginTop: 10,
                                height: '100%',
                                flexGrow: 2,
                                display: 'flex',
                                verticalAlign: 'middle',
                                backgroundColor: '#0192BF',
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5
                            }}
                        >
                            <Typography
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    width: '100%',
                                    marginY: 'auto',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                MODE
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 8,
                                marginTop: 10,
                                height: '100%',
                                backgroundColor: 'white',
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5
                            }}
                        >
                            <Select
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    boxShadow: 'none',
                                    margin: 0,
                                    padding: 0,
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 0
                                    }
                                }}
                                defaultValue={0}
                            >
                                <MenuItem value={0}>BUFFER</MenuItem>
                                <MenuItem value={1}>COMING SOON</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Paper
                        elevation={0}
                        sx={{
                            marginTop: 15,
                            height: '40%',
                            width: '84%',
                            marginLeft: '8%',
                            backgroundColor: 'white',
                            border: '2px solid #0192BF',
                            borderRadius: 2,
                            overflow: 'scroll'
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                position: 'sticky',
                                top: '0px',
                                zIndex: 100,
                                height: '10%',
                                width: '100%',
                                backgroundColor: '#0192BF',
                                borderRadius: 0
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    verticalAlign: 'center',
                                    height: '100%',
                                    width: '100%'
                                }}>

                                <Typography sx={{
                                    flexGrow: 10,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontFamily: 'Verdana',
                                    marginY: 'auto'
                                }}
                                    align={'center'}>
                                    DEVICES
                                </Typography>
                            </Box>
                        </Paper>
                        <DeviceDisplay deviceData={deviceData} />
                    </Paper>
                </Box>
            }

            {/* desktop */}
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#C7F2FF',
                    height: '100%',
                    paddingY: '100px',
                    '@media (max-width: 800px)': {
                        visibility: 'collapse'
                    }
                }}
            >
                <Box
                    sx={{
                        height: '50px',
                        width: '84%',
                        marginLeft: '8%',
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 2,
                            display: 'flex',
                            verticalAlign: 'middle',
                            backgroundColor: '#0192BF',
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5
                        }}
                    >
                        <Typography
                            sx={{
                                margin: 0,
                                padding: 0,
                                width: '100%',
                                marginY: 'auto',
                                textAlign: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                            MODE
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 8,
                            backgroundColor: 'white',
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5
                        }}
                    >
                        <Select
                            sx={{
                                width: '100%',
                                height: '100%',
                                boxShadow: 'none',
                                margin: 0,
                                padding: 0,
                                '.MuiOutlinedInput-notchedOutline': {
                                    border: 0
                                }
                            }}
                            defaultValue={0}
                        >
                            <MenuItem value={0}>BUFFER</MenuItem>
                            <MenuItem value={1}>COMING SOON</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Paper
                    elevation={0}
                    sx={{
                        marginTop: 5,
                        height: '40%',
                        width: '84%',
                        marginLeft: '8%',
                        backgroundColor: 'white',
                        border: '2px solid #0192BF',
                        borderRadius: 2,
                        overflow: 'scroll'
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            position: 'sticky',
                            top: '0px',
                            zIndex: 100,
                            height: '10%',
                            width: '100%',
                            backgroundColor: '#0192BF',
                            borderRadius: 0
                        }}
                    >
                        <Typography
                            sx={{
                                flexGrow: 10,
                                fontSize: '1.5em',
                                color: 'white',
                                fontWeight: 'bold',
                                fontFamily: 'Verdana',
                                marginY: 'auto'
                            }}
                            align={'center'}>
                            DEVICES
                        </Typography>
                    </Paper>
                    <DeviceDisplay deviceData={deviceData} />
                </Paper>
            </Box>
        </Box>
    )
}

export default SideBar;