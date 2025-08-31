import * as React from "react";
import {
    Box,
    IconButton,
    ImageListItem,
    ImageListItemBar
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GamesContentDialog from "./GamesContentDialog";
import { stringifyArrays } from "../Commons";

function GamesContent(props) {
    const {
        displayData
    } = props;

    const [open,setOpen] = React.useState(false);
    const [gameData,setGameData] = React.useState({});

    const cols = 6;
    const rows = [];

    for(let i = 0;i < displayData.length;i += cols) {
        rows.push(displayData.slice(i,i + cols));
    }

    const handleDialogOpen = (event,data) => {
        setOpen(true);
        setGameData(data);
    };

    const handleDialogClose = (event) => {
        setOpen(false);
    };

    return (
        <>
            {
                rows && rows.map((row,rowIndex) => {
                    return (
                        <Box
                            key={rowIndex}
                            display={"flex"}
                            justifyContent={"center"}
                            gap={2}
                            mb={2}
                        >
                            {
                                row.map((item) => {
                                    return (
                                        <ImageListItem key={item["name"]} sx={{ width: 225,height: 285 }}>
                                            <img
                                                src={`${item["cover_image_link"]}?w=225&h=285&fit=crop`}
                                                alt={item["name"]}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={item["name"]}
                                                subtitle={stringifyArrays(item["developer"])}
                                                actionIcon={
                                                    <IconButton onClick={(event) => handleDialogOpen(event,item)}>
                                                        <VisibilityIcon sx={{ color: 'white' }} />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    );
                                })
                            }
                        </Box>
                    );
                })
            }
            <GamesContentDialog open={open} handleClose={handleDialogClose} gameData={gameData} />
        </>
    );
}

export default GamesContent;