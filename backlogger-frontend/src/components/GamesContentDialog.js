import * as React from "react";
import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

function GamesContentDialog(props) {
    const {
        open,
        handleClose,
        gameData
    } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {gameData["name"]}
            </DialogTitle>
            <DialogContent dividers>
                <Stack direction={"row"} spacing={2}>
                    <img alt={gameData["name"]} src={`${gameData["coverImageLink"]}`} style={{ height: 300,width: 250 }} />
                    <Box>
                        <Typography>Platform: {gameData["platform"]}</Typography>
                        <Typography>ReleaseDate: {gameData["year"]}</Typography>
                        <Typography>Status: {gameData["status"]}</Typography>
                        <Typography>Developer: {String(gameData["developer"])}</Typography>
                        <Typography>Genres: {String(gameData["genres"])}</Typography>
                        <Typography>Completion Time: {gameData["completionTime"]}</Typography>
                        <Typography>Score: {gameData["score"]}</Typography>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default GamesContentDialog;