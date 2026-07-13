import { Box } from "@mui/material";
import NavbarAdmin from "../components/navBar/navBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <Box>
      <NavbarAdmin />
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
};