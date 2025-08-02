import * as React from "react";
import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { getScoreBackgroundColor, stringifyArrays } from "../Commons";

function GamesContentDialog(props) {
    const {
        open,
        handleClose,
        gameData
    } = props;

    const scoreBackgroundColor = getScoreBackgroundColor(gameData["score"]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            <DialogTitle>
                <b>{gameData["name"]}</b>
            </DialogTitle>
            <DialogContent dividers>
                <Stack direction={"row"} spacing={2}>
                    <img alt={gameData["name"]} src={`${gameData["coverImageLink"]}`} style={{ height: 285,width: 225 }} />
                    <Box>
                        <Typography>Platform: {gameData["platform"]}</Typography>
                        <Typography>Release Date: {gameData["year"]}</Typography>
                        <Typography>Status: {gameData["status"]}</Typography>
                        <Typography>Developer: {stringifyArrays(gameData["developer"])}</Typography>
                        <Typography>Genres: {stringifyArrays(gameData["genres"])}</Typography>
                        <Typography>Completion Time: {gameData["completionTime"]} hours</Typography>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} paddingTop={5}>
                            <Box
                                sx={{
                                        borderRadius: '50%',
                                        'backgroundColor': scoreBackgroundColor["backgroundColor"],
                                        width: 75,
                                        height: 75
                                    }}
                                >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography sx={{ fontSize: 28,color: scoreBackgroundColor["color"] }}><b>{gameData["score"]}</b></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default GamesContentDialog;