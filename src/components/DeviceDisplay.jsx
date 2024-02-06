import { Box, Chip, Paper, Typography } from "@mui/material";
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import { useContext } from "react";
import DeviceCheckmaskContext from "../contexts/DeviceCheckmaskContext";
import UserDeviceDataContext from "../contexts/UserDeviceDataContext";
import CircularProgress from '@mui/material/CircularProgress';
import BufferReceiverContext from "../contexts/BufferReceiverContext";

function DeviceDisplay() {
    const { checkmask, setCheckmask } = useContext(DeviceCheckmaskContext);
    const { deviceData } = useContext(UserDeviceDataContext);
    const { bufferReceiverId, setBufferReceiverId } = useContext(BufferReceiverContext);

    return (
        <Box
            sx={{
                flexDirection: 'column',
                height: '90%',
                width: '90%',
                marginX: '5%',
                marginY: '5%',
            }}
        >
            {
                deviceData.length === 0 &&
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40%' }}>
                    <CircularProgress sx={{ color: '#0192BF' }} />
                </Box>
            }
            {deviceData.length > 0 && deviceData.map((item, index) => (
                <Paper
                    elevation={0}
                    key={index}
                    sx={{
                        flexGrow: 1,
                        width: '100%',
                        height: '50px',
                        marginTop: '10px',
                        backgroundColor: '#F5F5F5',
                        border: '1px solid #d1d1d1',
                        borderRadius: 1,
                        cursor: 'pointer',
                        filter: (checkmask & (1 << index) ? 'brightness(90%)' : 'brightness(100%)'),
                        ":hover": {
                            filter: (checkmask & (1 << index) ? 'brightness(90%)' : 'brightness(95%)')
                        }
                    }}
                    onClick={() => {
                        setCheckmask(1 << index);
                        setBufferReceiverId(
                            item["deviceId"].slice(item["deviceId"].search(/\./) + 1)
                        );
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            verticalAlign: 'middle',
                        }}
                    >
                        <Typography
                            sx={{
                                flexGrow: 5,
                                marginY: 'auto',
                                textAlign: 'center',
                                color: '#878787'
                            }}>{item["deviceName"]}</Typography>
                        <Chip
                            sx={{
                                flexGrow: 4,
                                marginY: 'auto',
                                backgroundColor: '#E4E4E4',
                                color: '#878787'
                            }}
                            size="small"
                            label={item["deviceId"]} />
                        <CircleTwoToneIcon
                            sx={{
                                fontSize: '12px',
                                flexGrow: 1,
                                marginTop: '2px',
                                marginLeft: '2px',
                                filter: `invert(68%) sepia(${item["status"] === "unknown" ? 1 : 81}%)
                                    saturate(4119%) hue-rotate(5deg) 
                                    brightness(${item["status"] === "dirty" ? 111 : 70}%) contrast(106%)`
                            }}></CircleTwoToneIcon>
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}

export default DeviceDisplay;