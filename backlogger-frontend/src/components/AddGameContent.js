import * as React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddGameDialog from './AddGameDialog';

function AddGameContent(props) {
    const [dialogOpen,setDialogOpen] = React.useState(false);

    const handleDialogOpen = (event) => {
        setDialogOpen(true);
    };

    const handleDialogClose = (event) => {
        setDialogOpen(false);
    };

    return (
        <>
            <IconButton
                onClick={handleDialogOpen}
                sx={{
                    position: 'fixed',
                    height: '4rem',
                    width: '4rem',
                    fontSize: '35px',
                    bottom: 30,
                    right: 30,
                    borderRadius: '50%',
                    zIndex: 1000,
                    backgroundColor: 'green',
                    '&:hover': {
                        backgroundColor: 'green'
                    }
                }}
            >
                <AddIcon sx={{ fontSize: 'inherit',color: 'white' }} />
            </IconButton>
            <AddGameDialog open={dialogOpen} handleClose={handleDialogClose} />
        </>
    );
}

export default AddGameContent;