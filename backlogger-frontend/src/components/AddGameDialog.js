import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddGameForm from './AddGameForm';

function AddGameDialog(props) {
    const {
        open,
        handleClose,
        gameData = null,
        handleCurrentPageData
    } = props;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: 'monospace',fontSize: 20 }}>
                <b>{gameData === null ? "Add New Game" : "Edit Game"}</b>
            </DialogTitle>
            <DialogContent dividers>
                <AddGameForm handleClose={handleClose} gameData={gameData} handleCurrentPageData={handleCurrentPageData} />
            </DialogContent>
        </Dialog>
    );
}

export default AddGameDialog;