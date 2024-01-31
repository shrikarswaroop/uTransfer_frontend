import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Access from "../components/Access";
import ActionIndexContext from "../contexts/ActionIndexContext.js";
import { useState } from "react";

function Enter() {
    const [actionIndex, setActionIndex] = useState(0);
    return (
        <ActionIndexContext.Provider value={{ actionIndex, setActionIndex }}>
            <Box
                sx={{
                    height: '100vh',
                    width: '100%',
                    backgroundColor: '#C7F2FF',
                }}>
                <NavBar />

                <Access />
            </Box>
        </ActionIndexContext.Provider>
    )
}

export default Enter;