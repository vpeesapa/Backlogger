import * as React from "react";
import {
    Box,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import GamesContent from "./GamesContent";
import { platformFilters, statusFilters } from "../Constants";

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
    }

    return (
        <Box maxWidth sx={{ width: '100%',paddingTop: 2 }}>
            {
                displayForm ? (
                    <Stack direction={"row"} spacing={2} sx={{ width: '100%',justifyContent: 'center' }}>
                        <>
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
                        </>
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
                            type="number"
                            variant="outlined"
                            slotProps={{
                                htmlInput: {
                                    min: "0"
                                }
                            }}
                            sx={{ width: '10%' }}
                        />
                    </Stack>
                ) : (
                    <GamesContent displayData={recommendationData} />
                )
            }
        </Box>
    );
}

export default RecommendationContent;