import * as React from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { appBarStyles, buttonStyles, typographyStyles } from "../styles";

function NavBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={appBarStyles}>
                <Toolbar>
                    <Stack direction={"row"} spacing={150}>
                        <Typography variant="h3" color="inherit" sx={typographyStyles}>
                            Varun's Perpetual Backlog
                        </Typography>
                        <Button variant="contained" sx={buttonStyles}>
                            Recommend Me!
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;