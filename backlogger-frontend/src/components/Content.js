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
import { platformFilters, platformMapper, statsFilters, statusFilters, statusMapper } from '../Commons';
import { fetchDataByPlatformService, fetchDataByStatusService, fetchPlatformDistributionDataService, fetchScoreDistributionDataService, fetchStatusDistributionDataService } from '../services/ApiService';
import SearchContent from './SearchContent';

function Content(props) {
    const [statsData,setStatsData] = React.useState({
        "Platform": {},
        "Status": {},
        "Scores": {}
    });
    const [displayData,setDisplayData] = React.useState([]);

    const [currentFilters,setCurrentFilters] = React.useState(platformFilters);
    const [selectedType,setSelectedType] = React.useState("Platform");
    const [selectedOption,setSelectedOption] = React.useState(platformFilters[0]);

    const [displayGames,setDisplayGames] = React.useState(true);
    const [displayStats,setDisplayStats] = React.useState(false);
    const [displayRecommendations,setDisplayRecommendations] = React.useState(false);
    const [displayFilters,setDisplayFilters] = React.useState(true);

    const [currentQuery,setCurrentQuery] = React.useState("");

    const searchRef = React.useRef(null);

    React.useEffect(() => {
        fetchCurrentPageData();
        fetchPlatformDistributionData();
        fetchStatusDistributionData();
        fetchScoreDistributionData();
    },[]);

    const fetchCurrentPageData = (type=selectedType,option=selectedOption) => {
        setSelectedType(type);
        setSelectedOption(option);
        
        if(type === "Platform") {
            fetchDataByPlatformService(platformMapper[option])
                .then(responseData => {
                    setDisplayData(responseData);
                }).catch(e => {
                    console.error(e);
                });
        } else if(type === "Status") {
            fetchDataByStatusService(statusMapper[option])
                .then(responseData => {
                    setDisplayData(responseData);
                }).catch(e => {
                    console.error(e);
                });
        } else if(type === "Search") {
            searchRef.current?.searchGame(currentQuery);
        }

        // Fetch the stats accordingly
        fetchPlatformDistributionData();
        fetchStatusDistributionData();
        fetchScoreDistributionData();
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

    const fetchScoreDistributionData = () => {
        fetchScoreDistributionDataService()
            .then(responseData => {
                setStatsData((prevData) => {
                    return {
                        ...prevData,
                        "Scores": responseData
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
            setDisplayRecommendations(false);
            setDisplayFilters(true);
            setCurrentFilters(platformFilters);
            fetchCurrentPageData("Platform",platformFilters[0]);
        } else if(newValue === "Status") {
            setDisplayGames(true);
            setDisplayStats(false);
            setDisplayRecommendations(false);
            setDisplayFilters(true);
            setCurrentFilters(statusFilters);
            fetchCurrentPageData("Status",statusFilters[0]);
        } else if(newValue === "Stats") {
            setDisplayGames(false);
            setDisplayStats(true);
            setDisplayRecommendations(false);
            setDisplayFilters(true);
            setSelectedType("Stats");
            setCurrentFilters(statsFilters);
            setSelectedOption(statsFilters[0]);
            setDisplayData(statsData["Platform"]);
        } else if(newValue === "Recommend") {
            setDisplayGames(false);
            setDisplayStats(false);
            setDisplayRecommendations(true);
            setDisplayFilters(false);
            setSelectedType("Recommend");
            setCurrentFilters([]);
            setSelectedOption("");
            setDisplayData([]);
        } else if(newValue === "Search") {
            setDisplayGames(false);
            setDisplayStats(false);
            setDisplayRecommendations(false);
            setDisplayFilters(false);
            setSelectedType("Search");
            setCurrentFilters([]);
            setSelectedOption("");
            setDisplayData([]);
        }
    }

    const handleChangeFilter = (event,newValue) => {
        event.preventDefault();

        setSelectedOption(newValue);

        if(selectedType === "Platform") {
            fetchCurrentPageData("Platform",newValue);
        } else if(selectedType === "Status") {
            fetchCurrentPageData("Status",newValue);
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
                    <Tab
                        label={"Search"}
                        value={"Search"}
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
                            <GamesContent displayData={displayData} handleCurrentPageData={fetchCurrentPageData} />
                        ) : (
                            displayStats ? (
                                <StatsContent displayData={displayData} currentOption={selectedOption} />
                            ) : (
                                displayRecommendations ? (
                                    <RecommendationContent />
                                ) : <SearchContent handleCurrentPageData={fetchCurrentPageData} handleSearchQuery={setCurrentQuery} ref={searchRef} />
                            )
                        )
                    }
                </Box>
            </Stack>
            {
                displayGames ? (
                    <AddGameContent handleCurrentPageData={fetchCurrentPageData} />
                ) : null
            }
        </Box>
    );
}

export default Content;