import * as React from 'react';
import axios from 'axios';
import {
    Box,
    Stack,
    Tab,
    Tabs
} from '@mui/material';
import GamesContent from './GamesContent';
import StatsContent from './StatsContent';

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

const statsFilters = [
    "Platform",
    "Status"
]

function Content(props) {
    const [statusData,setStatusData] = React.useState({});
    const [platformData,setPlatformData] = React.useState({});
    const [platformDistributionData,setPlatformDistributionData] = React.useState({});
    const [statusDistributionData,setStatusDistributionData] = React.useState({});
    const [displayData,setDisplayData] = React.useState([]);

    const [currentFilters,setCurrentFilters] = React.useState(platformFilters);
    const [selectedType,setSelectedType] = React.useState("Platform");
    const [selectedOption,setSelectedOption] = React.useState(platformFilters[0]);

    const [displayGames,setDisplayGames] = React.useState(true);

    React.useEffect(() => {
        fetchPlatformData();
        fetchStatusData();
        fetchPlatformDistributionData();
        fetchStatusDistributionData();
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

    const fetchPlatformDistributionData = () => {
        axios.get("http://localhost:8090/games_distribution_per_platform")
            .then(response => {
                setPlatformDistributionData(response.data);
            }).catch(e => {
                console.error(e);
            })
    };

    const fetchStatusDistributionData = () => {
        axios.get("http://localhost:8090/games_distribution_per_status")
            .then(response => {
                setStatusDistributionData(response.data);
            }).catch(e => {
                console.error(e);
            })
    };

    const handleChangeType = (event,newValue) => {
        event.preventDefault();

        if(newValue === "Platform") {
            setDisplayGames(true);
            setSelectedType("Platform");
            setCurrentFilters(platformFilters);
            setSelectedOption(platformFilters[0]);
            setDisplayData(platformData[platformFilters[0]]);
        } else if(newValue === "Status") {
            setDisplayGames(true);
            setSelectedType("Status");
            setCurrentFilters(statusFilters);
            setSelectedOption(statusFilters[0]);
            setDisplayData(statusData[statusFilters[0]]);
        } else if(newValue === "Stats") {
            setDisplayGames(false);
            setSelectedType("Stats");
            setCurrentFilters(statsFilters);
            setSelectedOption(statsFilters[0]);
            setDisplayData(platformDistributionData);
        }
    }

    const handleChangeFilter = (event,newValue) => {
        event.preventDefault();

        setSelectedOption(newValue);

        if(selectedType === "Platform") {
            setDisplayData(platformData[newValue]);
        } else if(selectedType === "Status") {
            setDisplayData(statusData[newValue]);
        } else if(selectedType === "Stats") {
            setDisplayData(newValue === "Platform" ? platformDistributionData : statusDistributionData);
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
                    <Tab
                        label={"Stats"}
                        value={"Stats"}
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
                {
                    displayGames ? (
                        <GamesContent displayData={displayData} />
                    ) : (
                        <StatsContent displayData={displayData} />
                    )
                }
            </Stack>
        </Box>
    );
}

export default Content;