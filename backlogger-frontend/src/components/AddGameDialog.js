import * as React from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

function AddGameDialog(props) {
    const {
        open,
        handleClose
    } = props;

    const handlePageRefresh = (event) => {
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: 'monospace',fontSize: 20 }}>
                <b>Add New Game</b>
            </DialogTitle>
            <DialogContent dividers>
                <Button onClick={handlePageRefresh}>Refresh Page</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AddGameDialog;