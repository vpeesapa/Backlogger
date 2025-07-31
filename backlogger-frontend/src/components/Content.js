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
import { tabStyles } from '../styles';
import RecommendationContent from './RecommendationContent';
import { platformFilters, statsFilters, statusFilters } from '../Constants';

function Content(props) {
    const [statusData,setStatusData] = React.useState({});
    const [platformData,setPlatformData] = React.useState({});
    const [statsData,setStatsData] = React.useState({
        "Platform": {},
        "Status": {}
    });
    const [displayData,setDisplayData] = React.useState([]);

    const [currentFilters,setCurrentFilters] = React.useState(platformFilters);
    const [selectedType,setSelectedType] = React.useState("Platform");
    const [selectedOption,setSelectedOption] = React.useState(platformFilters[0]);

    const [displayGames,setDisplayGames] = React.useState(true);
    const [displayStats,setDisplayStats] = React.useState(false);
    const [displayFilters,setDisplayFilters] = React.useState(true);

    React.useEffect(() => {
        fetchPlatformData();
        fetchStatusData();
        fetchPlatformDistributionData();
        fetchStatusDistributionData();
    },[]);

    const fetchPlatformData = () => {
        axios.get(process.env.REACT_APP_BACKEND_API_URL + "/games_by_platform")
            .then(response => {
                console.log(response.data);
                
                setPlatformData(response.data);
                setDisplayData(response.data[platformFilters[0]]);
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchStatusData = () => {
        axios.get(process.env.REACT_APP_BACKEND_API_URL + "/all_games_by_status")
            .then(response => {
                setStatusData(response.data);
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchPlatformDistributionData = () => {
        axios.get(process.env.REACT_APP_BACKEND_API_URL + "/games_distribution_per_platform")
            .then(response => {
                setStatsData((prevData) => {
                    return {
                        ...prevData,
                        "Platform": response.data
                    };
                });
            }).catch(e => {
                console.error(e);
            })
    };

    const fetchStatusDistributionData = () => {
        axios.get(process.env.REACT_APP_BACKEND_API_URL + "/games_distribution_per_status")
            .then(response => {
                setStatsData((prevData) => {
                    return {
                        ...prevData,
                        "Status": response.data
                    };
                });
            }).catch(e => {
                console.error(e);
            })
    };

    const handleChangeType = (event,newValue) => {
        event.preventDefault();

        if(newValue === "Platform") {
            setDisplayGames(true);
            setDisplayStats(false);
            setDisplayFilters(true);
            setSelectedType("Platform");
            setCurrentFilters(platformFilters);
            setSelectedOption(platformFilters[0]);
            setDisplayData(platformData[platformFilters[0]]);
        } else if(newValue === "Status") {
            setDisplayGames(true);
            setDisplayStats(false);
            setDisplayFilters(true);
            setSelectedType("Status");
            setCurrentFilters(statusFilters);
            setSelectedOption(statusFilters[0]);
            setDisplayData(statusData[statusFilters[0]]);
        } else if(newValue === "Stats") {
            setDisplayGames(false);
            setDisplayStats(true);
            setDisplayFilters(true);
            setSelectedType("Stats");
            setCurrentFilters(statsFilters);
            setSelectedOption(statsFilters[0]);
            setDisplayData(statsData["Platform"]);
        } else if(newValue === "Recommend") {
            setDisplayGames(false);
            setDisplayStats(false);
            setDisplayFilters(false);
            setSelectedType("Recommend");
            setCurrentFilters([]);
            setSelectedOption("");
            setDisplayData([]);
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
            setDisplayData(statsData[newValue]);
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
                        sx={tabStyles}
                    />
                    <Tab
                        label={"Status"}
                        value={"Status"}
                        sx={tabStyles}
                    />
                    <Tab
                        label={"Stats"}
                        value={"Stats"}
                        sx={tabStyles}
                    />
                    <Tab
                        label={"Recommend"}
                        value={"Recommend"}
                        sx={tabStyles}
                    />
                </Tabs>
                {
                    displayFilters ? (
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
                                            sx={tabStyles}
                                        />
                                    );
                                })
                            }
                        </Tabs>
                    ) : null
                }
                {
                    displayGames ? (
                        <GamesContent displayData={displayData} />
                    ) : (
                        displayStats ? (
                            <StatsContent displayData={displayData} />
                        ) : (
                            <RecommendationContent />
                        )
                    )
                }
            </Stack>
        </Box>
    );
}

export default Content;