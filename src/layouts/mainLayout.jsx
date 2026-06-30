import { Box } from "@mui/material";
import Navbar from "../components/navBar/navBar";

export default function MainLayout({ children }) {
    return (
        <Box>
            <Navbar />
            <Box component="main">
                {children}
            </Box>
        </Box>
    );
};