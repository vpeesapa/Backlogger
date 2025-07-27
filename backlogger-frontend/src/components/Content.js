import * as React from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack,
    Tab,
    Tabs
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const platformFilters = [
    "PC (Steam)",
    "Nintendo Switch",
    "PC (Epic)",
    "PS5",
    "Xbox Game Pass",
    "PS4",
    "Nintendo Gameboy",
    "Nintendo DS",
    "Nintendo 3DS"
];

const statusFilters = [
    "Wishlist",
    "Backlog",
    "In Progress",
    "Complete",
    "Dropped"
];

function Content(props) {
    const [statusData,setStatusData] = React.useState({});
    const [platformData,setPlatformData] = React.useState({});
    const [displayData,setDisplayData] = React.useState([]);
    const [currentFilters,setCurrentFilters] = React.useState(platformFilters);

    const [selectedType,setSelectedType] = React.useState("Platform");
    const [selectedOption,setSelectedOption] = React.useState(platformFilters[0]);

    React.useEffect(() => {
        fetchPlatformData();
        fetchStatusData();
    },[]);

    const fetchPlatformData = () => {
        axios.get("http://localhost:8090/games_by_platform")
            .then(response => {
                console.log(response.data);
                
                setPlatformData(response.data);
                setDisplayData(response.data[platformFilters[0]]);
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchStatusData = () => {
        axios.get("http://localhost:8090/all_games_by_status")
            .then(response => {
                setStatusData(response.data);
            }).catch(e => {
                console.error(e);
            });
    };

    const handleChangeType = (event,newValue) => {
        event.preventDefault();

        if(newValue === "Platform") {
            setSelectedType("Platform");
            setCurrentFilters(platformFilters);
            setSelectedOption(platformFilters[0]);
            setDisplayData(platformData[platformFilters[0]]);
        } else if(newValue === "Status") {
            setSelectedType("Status");
            setCurrentFilters(statusFilters);
            setSelectedOption(statusFilters[0]);
            setDisplayData(statusData[statusFilters[0]]);
        }
    }

    const handleChangeFilter = (event,newValue) => {
        event.preventDefault();

        setSelectedOption(newValue);

        if(selectedType === "Platform") {
            setDisplayData(platformData[newValue]);
        } else if(selectedType === "Status") {
            setDisplayData(statusData[newValue]);
        }
    };

    return (
        <Box maxWidth sx={{ width: '100%' }}>
            <Stack direction={'column'} sx={{ alignItems: 'center',paddingTop: 2 }}>
                <Tabs
                    value={selectedType}
                    onChange={handleChangeType}
                >
                    <Tab
                        label={"Platform"}
                        value={"Platform"}
                        sx={{
                            color: '#00802b',
                            fontFamily: 'monospace',
                            fontWeight: 'bold'
                        }}
                    />
                    <Tab
                        label={"Status"}
                        value={"Status"}
                        sx={{
                            color: '#00802b',
                            fontFamily: 'monospace',
                            fontWeight: 'bold'
                        }}
                    />
                </Tabs>
                <Tabs
                    value={selectedOption}
                    onChange={handleChangeFilter}
                >
                    {
                        currentFilters.map((filter) => {
                            return (
                                <Tab
                                    key={filter}
                                    label={filter}
                                    value={filter}
                                    sx={{
                                        color: '#00802b',
                                        fontFamily: 'monospace',
                                        fontWeight: 'bold'
                                    }}
                                />
                            );
                        })
                    }
                </Tabs>
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
            </Stack>
        </Box>
    );
}

export default Content;