import * as React from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import axios from "axios";
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CasinoIcon from '@mui/icons-material/Casino';
import GamesContent from "./GamesContent";
import { platformFilters, platformMapper, statusFilters, statusMapper } from "../Commons";
import { buttonStyles } from "../styles";

const recommendButtonStyle = {
    ...buttonStyles,
    width: '8%'
};

const displayButtonStyle = {
    ...buttonStyles,
    width: '9%'
}

function RecommendationContent(props) {
    const [recommendationPayload,setRecommendationPayload] = React.useState({
        "platform": "",
        "status": "",
        "numRecommended": 0
    });
    const [recommendationData,setRecommendationData] = React.useState([]);

    const [displayForm,setDisplayForm] = React.useState(true);

    const [selectedStatus,setSelectedStatus] = React.useState("");
    const [selectedPlatform,setSelectedPlatform] = React.useState("");
    const [selectedNumber,setSelectedNumber] = React.useState(0);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    const handleNumberChange = (event) => {
        if(Number(event.target.value) < 0) {
            return;
        }

        setSelectedNumber(Number(event.target.value));
    };

    const preventTyping = (event) => {
        event.preventDefault();
    };

    const handleRecommendation = (event) => {
        const payload = {
            "status": statusMapper[selectedStatus],
            "platform": platformMapper[selectedPlatform],
            "numRecommended": selectedNumber
        };

        fetchRecommendationData(payload);
    };

    const fetchRecommendationData = (payload) => {
        axios.post(process.env.REACT_APP_BACKEND_API_URL + "/recommend",payload)
            .then(response => {
                setDisplayForm(false);
                setRecommendationPayload(payload);
                setRecommendationData(response.data);
            }).catch(e => {
                console.error(e);
            });
    };

    const handleReroll = (event) => {
        fetchRecommendationData(recommendationPayload);
    };

    const handleFormReturn = (event) => {
        setDisplayForm(true);
    };

    return (
        <Box maxWidth sx={{ width: '100%',paddingTop: 2 }}>
            {
                displayForm ? (
                    <Stack direction={"row"} spacing={2} sx={{ width: '100%',justifyContent: 'center' }}>
                        <Select
                            label="Status"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            sx={{ width: '20%' }}
                        >
                            {
                                statusFilters.map((status,index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={status}
                                        >
                                            {status}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                        <Select
                            label="Platform"
                            value={selectedPlatform}
                            onChange={handlePlatformChange}
                            sx={{ width: '20%' }}
                        >
                            {
                                platformFilters.map((platform,index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={platform}
                                        >
                                            {platform}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                        <TextField
                            value={selectedNumber}
                            onChange={handleNumberChange}
                            onKeyDown={preventTyping}
                            type="number"
                            variant="outlined"
                            slotProps={{
                                htmlInput: {
                                    min: "0"
                                }
                            }}
                            sx={{ width: '5%' }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleRecommendation}
                            disabled={selectedStatus === "" || selectedPlatform === "" || selectedNumber <= 0}
                            endIcon={<EastIcon />}
                            sx={recommendButtonStyle}
                        >
                            Recommend
                        </Button>
                    </Stack>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <GamesContent displayData={recommendationData} />
                        <Stack direction={"row"} spacing={2} sx={{ width: '100%',justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={handleFormReturn}
                                startIcon={<KeyboardBackspaceIcon />}
                                sx={displayButtonStyle}
                            >
                                Back to form
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleReroll}
                                endIcon={<CasinoIcon />}
                                sx={displayButtonStyle}
                            >
                                Roll again
                            </Button>
                        </Stack>
                    </Box>
                )
            }
        </Box>
    );
}

export default RecommendationContent;