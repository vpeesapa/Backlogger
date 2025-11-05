import * as React from 'react';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { platformFilters, platformMapper, statusFilters, statusMapper, } from '../Commons';
import { fetchAddGameService, fetchEditGameService } from '../services/ApiService';

function AddGameForm(props) {
    const {
        handleClose,
        gameData = null
    } = props;

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

    const [gameId,setGameId] = React.useState(-1);

    const [developerValue,setDeveloperValue] = React.useState("");
    const [genreValue,setGenreValue] = React.useState("");

    React.useEffect(() => {
        if(gameData === null) {
            return;
        }

        setPayload({
            name: gameData["name"],
            cover_image_link: gameData["cover_image_link"],
            platform: gameData["platform"],
            developer: gameData["developer"],
            year: gameData["year"] === "-" ? "" : gameData["year"],
            completion_time: gameData["completion_time"] === "-" ? "" : gameData["completion_time"],
            status: gameData["status"],
            genres: gameData["genres"],
            all_achievements: gameData["all_achievements"],
            score: gameData["score"] === "-" ? "" : gameData["score"]
        });

        setGameId(gameData["id"]);
    },[gameData]);

    const disableSubmitButton = () => {
        if(payload.name === "") {
            return true;
        }

        if(payload.cover_image_link === "") {
            return true;
        }

        if(payload.platform === "") {
            return true;
        }

        if(payload.developer.length === 0) {
            return true;
        }

        if(payload.status === "") {
            return true;
        }

        if(payload.genres.length === 0) {
            return true;
        }

        return false;
    };

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

    const validatePayload = () => {
        if(!payload.cover_image_link.startsWith("https://")) {
            alert("The link to the cover image should be a valid URL");
            return false;
        }

        if(payload.year !== "") {
            if(!Number(payload.year)) {
                alert("The year of the game's release should be a number if it's not empty");
                return false;
            }
            if(Number(payload.year) < 0) {
                alert("The year of the game's release cannot be a negative number if it's not empty");
                return false;
            }
            if(Number(payload.year) % 1 !== 0) {
                alert("The year of the game's release should be whole number if it's not empty");
                return false;
            }
        }

        if(payload.completion_time !== "") {
            if(!Number(payload.completion_time)) {
                alert("The time taken to complete the game should be a number if it's not empty");
                return false;
            }
            if(Number(payload.completion_time) < 0) {
                alert("The time taken to complete the game should not be a negative number if it's not empty");
                return false;
            }
        }

        if(payload.score !== "") {
            if(!Number(payload.score)) {
                alert("The game's score should be a number if it's not empty");
                return false;
            }
            if(Number(payload.score) < 0 || Number(payload.score) > 10) {
                alert("The game's score should be a number between 0 and 10");
                return false;
            }
        }

        return true;
    };

    const handleFormSubmit = (event) => {
        if(!validatePayload()) {
            return;
        }

        // Enrich the payload so that the values remain consistent with that in the backend
        const enrichedPayload = JSON.parse(JSON.stringify(payload));

        enrichedPayload.platform = platformMapper[payload.platform];
        enrichedPayload.status = statusMapper[payload.status];

        if(payload.year === "") {
            enrichedPayload.year = "-";
        }

        if(payload.completion_time === "") {
            enrichedPayload.completion_time = "-";
        }

        if(payload.score === "") {
            enrichedPayload.score = "-";
        }

        if(gameId !== -1) {
            // Need to edit the game's information
            fetchEditGameService(gameId,enrichedPayload)
                .then(responseData => {
                    console.log(responseData);
                    handleClose(event);

                    window.location.reload();
                }).catch(e => {
                    console.error(e);
                });
        } else {
            // The game's information will be added as a new game
            fetchAddGameService(enrichedPayload)
                .then(responseData => {
                    console.log(responseData);
                    handleClose(event);
    
                    // Reload the page to fetch everything including the new game
                    window.location.reload();
                }).catch(e => {
                    console.error(e);
                });
        }
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
                    fullWidth
                    label="Year"
                    value={payload.year}
                    onChange={(event) => handleTextFieldChange(event,"year")}
                />
                <TextField
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
            <Button
                variant="contained"
                color="success"
                disabled={disableSubmitButton()}
                onClick={handleFormSubmit}
            >
                {gameId === -1 ? "Add Game" : "Edit Game"}
            </Button>
        </Stack>
    );
}

export default AddGameForm;