import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchPlatformDataService = async () => {
    return api.get("/games_by_platform").then(response => response.data);
};

export const fetchStatusDataService = async () => {
    return api.get("/all_games_by_status").then(response => response.data);
};

export const fetchPlatformDistributionDataService = async () => {
    return api.get("/games_distribution_per_platform").then(response => response.data);
};

export const fetchStatusDistributionDataService = async () => {
    return api.get("/games_distribution_per_status").then(response => response.data);
};

export const fetchRecommendationDataService = async (recommendationPayload) => {
    return api.post("/recommend",recommendationPayload).then(response => response.data);
};

export const fetchAddGameService = async (gameAppendPayload) => {
    return api.post("/add_game",gameAppendPayload).then(response => response.data);
};

export const fetchEditGameService = async (gameId,gameEditPayload) => {
    return api.post(`/edit_game/${gameId}`,gameEditPayload).then(response => response.data);
};