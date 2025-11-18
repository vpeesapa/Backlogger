import * as React from "react";
import {
    Box,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    Menu,
    MenuItem
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GamesContentDialog from "./GamesContentDialog";
import { stringifyArrays } from "../Commons";
import AddGameDialog from "./AddGameDialog";
import DeleteGameDialog from "./DeleteGameDialog";

function GamesContent(props) {
    const {
        displayData,
        isRecommending = false,
        handleCurrentPageData
    } = props;

    const [open,setOpen] = React.useState(false);
    const [editDialogOpen,setEditDialogOpen] = React.useState(false);
    const [deleteDialogOpen,setDeleteDialogOpen] = React.useState(false);
    const [gameData,setGameData] = React.useState({});

    const [hoverRowIndex,setHoverRowIndex] = React.useState(-1);
    const [hoverColIndex,setHoverColIndex] = React.useState(-1);

    const [anchorEl,setAnchorEl] = React.useState(null);

    const menuOpen = Boolean(anchorEl);

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

    const handleMouseEnter = (event,rowIndex,colIndex) => {
        setHoverRowIndex(rowIndex);
        setHoverColIndex(colIndex);
    };

    const handleMouseExit = (event) => {
        setHoverRowIndex(-1);
        setHoverColIndex(-1)
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    };

    const handleEditGame = (event,game) => {
        setEditDialogOpen(true);
        setGameData(game);
        setAnchorEl(null);
    };

    const handleEditDialogClose = (event) => {
        setEditDialogOpen(false);
    }

    const handleDeleteGame = (event,game) => {
        setDeleteDialogOpen(true);
        setGameData(game);
        setAnchorEl(null);
    };

    const handleDeleteDialogClose = (event) => {
        setDeleteDialogOpen(false);
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
                                row.map((item,colIndex) => {
                                    return (
                                        <ImageListItem
                                            key={item["name"]}
                                            sx={{
                                                width: 225,
                                                height: 285 
                                            }}
                                            onMouseEnter={(event) => handleMouseEnter(event,rowIndex,colIndex)}
                                            onMouseLeave={handleMouseExit}
                                        >
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
                                            {
                                                !isRecommending && hoverRowIndex !== -1 && hoverColIndex !== -1 && hoverRowIndex === rowIndex && hoverColIndex === colIndex ? (
                                                    <Box>
                                                        <IconButton
                                                            onClick={handleMenuOpen}
                                                            sx={{
                                                                position: 'absolute',
                                                                right: '2%',
                                                                top: '2%',
                                                                backgroundColor: 'black',
                                                                '&:hover': {
                                                                    backgroundColor: 'black'
                                                                }
                                                            }}
                                                        >
                                                            <MoreVertIcon sx={{ color: 'white' }} />
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={menuOpen}
                                                            onClose={handleMenuClose}
                                                        >
                                                            <MenuItem onClick={(event) => handleEditGame(event,item)}><EditIcon sx={{ marginRight: 1 }} />Edit</MenuItem>
                                                            <MenuItem onClick={(event) => handleDeleteGame(event,item)}><DeleteIcon sx={{ marginRight: 1 }} />Delete</MenuItem>
                                                        </Menu>
                                                    </Box>
                                                ) : null
                                            }
                                        </ImageListItem>
                                    );
                                })
                            }
                        </Box>
                    );
                })
            }
            <GamesContentDialog open={open} handleClose={handleDialogClose} gameData={gameData} />
            <AddGameDialog open={editDialogOpen} handleClose={handleEditDialogClose} gameData={gameData} handleCurrentPageData={handleCurrentPageData} />
            <DeleteGameDialog open={deleteDialogOpen} handleClose={handleDeleteDialogClose} gameData={gameData} handleCurrentPageData={handleCurrentPageData} />
        </>
    );
}

export default GamesContent;