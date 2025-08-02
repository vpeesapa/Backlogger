import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { appBarStyles, typographyStyles } from "../styles";

function NavBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={appBarStyles}>
                <Toolbar>
                    <Typography variant="h3" color="inherit" sx={typographyStyles}>
                        Varun's Perpetual Backlog
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;