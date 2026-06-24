
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Category() {
    return (
        <AppBar>
            <Toolbar>
                <IconButton>
                    <FacebookIcon />
                </IconButton>
                <IconButton>
                    <InstagramIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}