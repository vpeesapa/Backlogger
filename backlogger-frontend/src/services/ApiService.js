import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchPlatformDataService = () => {
    return api.get("/games_by_platform").then(response => response.data);
};

export const fetchStatusDataService = () => {
    return api.get("/all_games_by_status").then(response => response.data);
};

export const fetchPlatformDistributionDataService = () => {
    return api.get("/games_distribution_per_platform").then(response => response.data);
};

export const fetchStatusDistributionDataService = () => {
    return api.get("games_distribution_per_status").then(response => response.data);
};

export const fetchRecommendationDataService = (recommendationPayload) => {
    return api.post("/recommend",recommendationPayload).then(response => response.data);
};