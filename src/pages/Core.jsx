import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import BufferDataDisplay from "../components/BufferDataDisplay";
import SettingsIcon from '@mui/icons-material/Settings';
import DeviceCheckmaskContext from "../contexts/DeviceCheckmaskContext";

function Core() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [checkmask, setCheckmask] = useState(0);

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
    });

    useEffect(() => { }, [windowWidth]);

    return (
        <Box
            sx={{
                height: '100vh',
                maxHeight: '100vh',
                maxWidth: '100vw',
                width: '100vw',
                overflow: 'hidden'
            }}>
            <NavBar loggedIn={true} />
            {windowWidth >= 800 &&
                <Box
                    sx={{
                        display: 'flex',
                        maxHeight: '93vh',
                        height: '93vh',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            flexGrow: 2,
                            backgroundColor: 'white',
                            '@media (max-width: 800px)': {
                                flexGrow: (sideBarOpen ? 10 : 0)
                            },
                            '@media (min-width: 801px) and (max-width: 1200px) ': {
                                flexGrow: 3.5
                            }
                        }}>
                        <DeviceCheckmaskContext.Provider value={{ checkmask, setCheckmask }}>
                            <SideBar isOpen={sideBarOpen} setOpen={setSideBarOpen} />
                        </DeviceCheckmaskContext.Provider>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            flexGrow: 16,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            verticalAlign: 'center',
                            '@media (max-width: 800px)': {
                                visibility: (sideBarOpen ? 'collapse' : 'visible'),
                                flexGrow: (sideBarOpen ? 0 : 100),
                            },
                        }}>
                        {!sideBarOpen && <BufferDataDisplay height={60} width={70} />}
                    </Box>
                </Box>
            }
            {windowWidth < 800 &&
                <Box
                    sx={{
                        maxHeight: '95vh',
                        height: '95vh',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 80,
                            width: '40px',
                            backgroundColor: '#C7F2FF',
                            height: '30px',
                            border: '2px solid #0192BF',
                            borderLeft: 0,
                            borderRadius: 50,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            cursor: 'pointer',
                            '@media (min-width: 800px)': {
                                visibility: 'collapse'
                            }

                        }}
                        onClick={() => { setSideBarOpen(true) }}
                    >
                        <SettingsIcon sx={{ color: '#0192BF', width: '100%', height: '100%' }} />
                    </Box>
                    {sideBarOpen &&
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'white',
                                '@media (max-width: 800px)': {
                                    flexGrow: (sideBarOpen ? 10 : 0)
                                },
                                '@media (min-width: 801px) and (max-width: 1200px) ': {
                                    flexGrow: 3.5
                                }
                            }}>
                            <DeviceCheckmaskContext.Provider value={{ checkmask, setCheckmask }}>
                                <SideBar isOpen={sideBarOpen} setOpen={setSideBarOpen} />
                            </DeviceCheckmaskContext.Provider>
                        </Box>
                    }
                    {!sideBarOpen &&
                        <Box
                            sx={{
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                verticalAlign: 'center',
                                '@media (max-width: 800px)': {
                                    visibility: (sideBarOpen ? 'collapse' : 'visible'),
                                    flexGrow: (sideBarOpen ? 0 : 100),
                                },
                            }}>
                            {!sideBarOpen && <BufferDataDisplay height={60} width={70} />}
                        </Box>}
                </Box>
            }
        </Box>
    )
}

export default Core;