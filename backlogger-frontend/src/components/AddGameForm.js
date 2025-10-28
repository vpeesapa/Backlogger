import * as React from 'react';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { platformFilters, statusFilters, } from '../Commons';

function AddGameForm(props) {
    const [payload,setPayload] = React.useState({
        name: "",
        cover_image_link: "",
        platform: "",
        developer: [],
        year: "",
        completion_time: "",
        status: "",
        genres: [],
        all_achievements: false,
        score: ""
    });

    const [developerValue,setDeveloperValue] = React.useState("");
    const [genreValue,setGenreValue] = React.useState("");

    const handleTextFieldChange = (event,textFieldType) => {
        switch(textFieldType) {
            case "name":
                setPayload({
                    ...payload,
                    name: event.target.value
                });
                break;
            case "coverImageLink":
                setPayload({
                    ...payload,
                    cover_image_link: event.target.value
                });
                break;
            case "developer":
                setDeveloperValue(event.target.value);
                break;
            case "year":
                setPayload({
                    ...payload,
                    year: event.target.value
                });
                break;
            case "completionTime":
                setPayload({
                    ...payload,
                    completion_time: event.target.value
                });
                break;
            case "genres":
                setGenreValue(event.target.value);
                break;
            case "score":
                setPayload({
                    ...payload,
                    score: event.target.value
                });
                break;
            default:
                break;
        }
    };

    const handleTextFieldKeyDown = (event,inputType) => {
        if(event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        switch(inputType) {
            case "developer":
                if(!developerValue.trim()) {
                    return;
                }

                if(payload.developer.includes(developerValue.trim())){
                    // No duplication of developers
                    return;
                }

                setPayload({
                    ...payload,
                    developer: [...payload.developer,developerValue.trim()]
                });
                setDeveloperValue("");
                break;
            case "genres":
                if(!genreValue.trim()) {
                    return;
                }

                if(payload.genres.includes(genreValue.trim())) {
                    // No duplication of genres
                    return;
                }

                setPayload({
                    ...payload,
                    genres: [...payload.genres,genreValue.trim()]
                });
                setGenreValue("");
                break;
            default:
                break;
        }
    };

    const handleChipDelete = (event,chipToDelete,inputType) => {
        switch(inputType) {
            case "developer":
                setPayload({
                    ...payload,
                    developer: payload.developer.filter(dev => dev !== chipToDelete)
                });
                break;
            case "genres":
                setPayload({
                    ...payload,
                    genres: payload.genres.filter(genre => genre !== chipToDelete)
                });
                break;
            default:
                break;
        }
    };

    const handleSelectChange = (event,selectType) => {
        switch(selectType) {
            case "platform":
                setPayload({
                    ...payload,
                    platform: event.target.value
                });
                break;
            case "status":
                setPayload(() => {
                    if(event.target.value !== "Complete") {
                        // Reset achievements status and score if status isn't "Complete"
                        return {
                            ...payload,
                            status: event.target.value,
                            all_achievements: false,
                            score: ''
                        };
                    }

                    return {
                        ...payload,
                        status: event.target.value
                    };
                });
                break;
            default:
                break;
        }
    };

    const handleCheckboxChange = (event) => {
        setPayload({
            ...payload,
            all_achievements: event.target.checked
        });
    };

    const handlePageRefresh = (event) => {
        window.location.reload();
    };

    return (
        <Stack spacing={2}>
            <TextField
                required
                fullWidth
                label="Name"
                value={payload.name}
                onChange={(event) => handleTextFieldChange(event,"name")}
            />
            <TextField
                required
                fullWidth
                label="Cover Image Link"
                value={payload.cover_image_link}
                onChange={(event) => handleTextFieldChange(event,"coverImageLink")}
            />
            <FormControl fullWidth>
                <InputLabel required>Platform</InputLabel>
                <Select
                    label="Platform"
                    value={payload.platform}
                    onChange={(event) => handleSelectChange(event,"platform")}
                >
                    {
                        platformFilters.map((platform,index) => (
                            <MenuItem key={index} value={platform}>{platform}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Stack fullWidth spacing={2}>
                {
                    payload.developer.length > 0 ? (
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={1}
                            marginBottom={1}
                        >
                            {
                                payload.developer.map((developer,index) => (
                                    <Chip
                                        color="primary"
                                        key={index}
                                        label={developer}
                                        onDelete={(event) => handleChipDelete(event,developer,"developer")}
                                        sx={{ marginRight: 0.5 }}
                                    />
                                ))
                            }
                        </Box>
                    ) : null
                }
                <TextField
                    required
                    fullWidth
                    label="Developer"
                    value={developerValue}
                    onChange={(event) => handleTextFieldChange(event,"developer")}
                    onKeyDown={(event) => handleTextFieldKeyDown(event,"developer")}
                />
            </Stack>
            <Stack direction={'row'} fullWidth spacing={1}>
                <TextField
                    required
                    fullWidth
                    label="Year"
                    value={payload.year}
                    onChange={(event) => handleTextFieldChange(event,"year")}
                />
                <TextField
                    required
                    fullWidth
                    label="Completion Time"
                    value={payload.completion_time}
                    onChange={(event) => handleTextFieldChange(event,"completionTime")}
                />
            </Stack>
            <FormControl fullWidth>
                <InputLabel required>Status</InputLabel>
                <Select
                    label="Status"
                    value={payload.status}
                    onChange={(event) => handleSelectChange(event,"status")}
                >
                    {
                        statusFilters.map((status,index) => (
                            <MenuItem key={index} value={status}>{status}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Stack fullWidth spacing={2}>
                {
                    payload.genres.length > 0 ? (
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={1}
                            marginBottom={1}
                        >
                            {
                                payload.genres.map((genre,index) => (
                                    <Chip
                                        color="primary"
                                        key={index}
                                        label={genre}
                                        onDelete={(event) => handleChipDelete(event,genre,"genres")}
                                        sx={{ marginRight: 0.5 }}
                                    />
                                ))
                            }
                        </Box>
                    ) : null
                }
                <TextField
                    required
                    fullWidth
                    label="Genres"
                    value={genreValue}
                    onChange={(event) => handleTextFieldChange(event,"genres")}
                    onKeyDown={(event) => handleTextFieldKeyDown(event,"genres")}
                />
            </Stack>
            {
                payload.status === "Complete" ? (
                    <Stack direction={'row'} fullWidth spacing={10} justifyContent={"center"}>
                        <FormControlLabel
                            label="All Achievements"
                            control={<Checkbox checked={payload.all_achievements} onChange={handleCheckboxChange} />}
                        />
                        <TextField
                            label="Score"
                            value={payload.score}
                            onChange={(event) => handleTextFieldChange(event,"score")}
                        />
                    </Stack>
                ) : null
            }
            <Button variant="contained" color="success" onClick={handlePageRefresh}>Add Game</Button>
        </Stack>
    );
}

export default AddGameForm;