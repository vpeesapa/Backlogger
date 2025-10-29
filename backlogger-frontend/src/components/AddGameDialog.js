import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddGameForm from './AddGameForm';

function AddGameDialog(props) {
    const {
        open,
        handleClose
    } = props;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: 'monospace',fontSize: 20 }}>
                <b>Add New Game</b>
            </DialogTitle>
            <DialogContent dividers>
                <AddGameForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
}

export default AddGameDialog;