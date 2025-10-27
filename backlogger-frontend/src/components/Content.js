import * as React from 'react';
import {
    Box,
    Stack,
    Tab,
    Tabs
} from '@mui/material';
import GamesContent from './GamesContent';
import StatsContent from './StatsContent';
import RecommendationContent from './RecommendationContent';
import AddGameContent from './AddGameContent';
import { tabStyles } from '../styles';
import { platformFilters, statsFilters, statusFilters } from '../Commons';
import { fetchPlatformDataService, fetchPlatformDistributionDataService, fetchStatusDataService, fetchStatusDistributionDataService } from '../services/ApiService';

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
        fetchPlatformDataService()
            .then(responseData => {
                setPlatformData(responseData);
                setDisplayData(responseData[platformFilters[0]]);
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchStatusData = () => {
        fetchStatusDataService()
            .then(responseData => {
                setStatusData(responseData);
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchPlatformDistributionData = () => {
        fetchPlatformDistributionDataService()
            .then(responseData => {
                setStatsData((prevData) => {
                    return {
                        ...prevData,
                        "Platform": responseData
                    };
                });
            }).catch(e => {
                console.error(e);
            });
    };

    const fetchStatusDistributionData = () => {
        fetchStatusDistributionDataService()
            .then(responseData => {
                setStatsData((prevData) => {
                    return {
                        ...prevData,
                        "Status": responseData
                    };
                });
            }).catch(e => {
                console.error(e);
            });
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
                <Box paddingTop={2} sx={{ width: '100%' }}>
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
                </Box>
            </Stack>
            {
                displayGames ? (
                    <AddGameContent />
                ) : null
            }
        </Box>
    );
}

export default Content;