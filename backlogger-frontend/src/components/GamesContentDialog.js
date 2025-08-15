import * as React from "react";
import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { getScoreBackgroundColor, getStatusColor, stringifyArrays } from "../Commons";

function GamesContentDialog(props) {
    const {
        open,
        handleClose,
        gameData
    } = props;

    const statusColor = getStatusColor(gameData["status"]);
    const scoreBackgroundColor = getScoreBackgroundColor(gameData["score"]);
    const titleBackground = gameData["allAchievements"] ? {
        backgroundColor: 'grey',
        color: 'white'
     } : {
        backgroundColor: 'white',
        color: 'black'
     };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontFamily: 'monospace',fontSize: 20,backgroundColor: titleBackground.backgroundColor,color: titleBackground.color }}>
                <b>{gameData["name"]}</b>
            </DialogTitle>
            <DialogContent dividers>
                <Stack direction={"row"} spacing={2}>
                    <img alt={gameData["name"]} src={`${gameData["coverImageLink"]}`} style={{ height: 285,width: 225 }} />
                    <Box>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18 }}><b>Platform</b>: {gameData["platform"]}</Typography>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18 }}><b>Release Date</b>: {gameData["year"]}</Typography>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18,color: statusColor }}><b>Status</b>: {gameData["status"]}</Typography>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18 }}><b>Developer</b>: {stringifyArrays(gameData["developer"])}</Typography>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18 }}><b>Genres</b>: {stringifyArrays(gameData["genres"])}</Typography>
                        <Typography sx={{ fontFamily: 'monospace',fontSize: 18 }}><b>Completion Time</b>: {gameData["completionTime"]} hours</Typography>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} paddingTop={2}>
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