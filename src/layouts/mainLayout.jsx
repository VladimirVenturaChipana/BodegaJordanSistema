import { Box } from "@mui/material";
import Navbar from "../components/navBar/navBar";
import MobileBottomSpacer from '../components/mobileBottomSpacer';

export default function MainLayout({ children }) {
    return (
        <Box>
            <Navbar />
            <MobileBottomSpacer>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {children}
                </Box>
            </MobileBottomSpacer>
        </Box>
    );
};