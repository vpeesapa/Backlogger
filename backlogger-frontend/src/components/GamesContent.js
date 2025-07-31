import * as React from "react";
import {
    IconButton,
    ImageList,
    ImageListItem,ImageListItemBar
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

function GamesContent(props) {
    const {
        displayData
    } = props;

    return (
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
                                    <IconButton>
                                        <VisibilityIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    );
                })
            }
        </ImageList>
    );
}

export default GamesContent;