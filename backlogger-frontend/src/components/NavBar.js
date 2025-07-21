import * as React from "react"
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

function NavBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#00802b' }}>
                <Toolbar>
                    <Stack direction={"row"} spacing={155}>
                        <Typography variant="h3" color="inherit" sx={{ mr: 2,fontSize: 35 }}>
                            Varun's Perpetual Backlog
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#809fff' }}>
                            Recommend Me!
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;