import { Box, Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import * as React from 'react';
import { fetchDeleteGameService } from '../services/ApiService';

function DeleteGameDialog(props) {
    const {
        open,
        handleClose,
        gameData,
        handleCurrentPageData
    } = props;

    const handleDeleteGame = (event) => {
        fetchDeleteGameService(gameData["id"])
            .then(responseData => {
                console.log(responseData);
                handleClose(event);

                handleCurrentPageData();
            }).catch(e => {
                console.error(e);
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: 'monospace',fontSize: 20 }}>
                <b>Delete {gameData["name"]}</b>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'grid',justifyContent: 'center',marginTop: -3 }}>
                    <p style={{ fontSize: 18 }}>Are you sure you want to delete this game?</p>
                    <Stack direction={"row"} spacing={2} sx={{ display: 'flex',justifyContent: 'center' }}>
                        <Button variant="contained" color="success" onClick={handleDeleteGame}>
                            Yes
                        </Button>
                        <Button variant="contained" color="error" onClick={handleClose}>
                            No
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteGameDialog;