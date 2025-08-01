import * as React from "react";
import {
    IconButton,
    ImageList,
    ImageListItem,ImageListItemBar
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GamesContentDialog from "./GamesContentDialog";

function GamesContent(props) {
    const {
        displayData
    } = props;

    const [open,setOpen] = React.useState(false);
    const [gameData,setGameData] = React.useState({});

    const handleDialogOpen = (event,data) => {
        setOpen(true);
        setGameData(data);
    };

    const handleDialogClose = (event) => {
        setOpen(false);
    };

    return (
        <>
            <ImageList cols={6} sx={{ paddingX: 10 }}>
                {
                    displayData && displayData.map((data) => {
                        return (
                            <ImageListItem key={data["name"]}>
                                <img
                                    srcSet={`${data["coverImageLink"]}`}
                                    src={`${data["coverImageLink"]}`}
                                    alt={data["name"]}
                                    loading='lazy'
                                />
                                <ImageListItemBar
                                    title={data["name"]}
                                    subtitle={String(data["developer"])}
                                    actionIcon={
                                        <IconButton onClick={(event) => handleDialogOpen(event,data)}>
                                            <VisibilityIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        );
                    })
                }
            </ImageList>
            {
                <GamesContentDialog open={open} handleClose={handleDialogClose} gameData={gameData} />
            }
        </>
    );
}

export default GamesContent;