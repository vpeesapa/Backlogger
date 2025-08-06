export const platformFilters = [
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

export const statusFilters = [
    "Wishlist",
    "Backlog",
    "In Progress",
    "Complete",
    "Dropped"
];

export const statsFilters = [
    "Platform",
    "Status"
];

export const platformMapper = {
    "PC (Steam)": "steam",
    "Nintendo Switch": "nintendo_switch",
    "PC (Epic)": "epic",
    "PS5": "ps5",
    "Xbox Game Pass": "xbox_game_pass",
    "PS4": "ps4",
    "Nintendo Gameboy": "nintendo_gameboy",
    "Nintendo DS": "nintendo_ds",
    "Nintendo 3DS": "nintendo_3ds"
};

export const statusMapper = {
    "Wishlist": "wishlist",
    "Backlog": "backlog",
    "In Progress": "in_progress",
    "Complete": "complete",
    "Dropped": "dropped"
};

export function stringifyArrays(arr) {
    if(!arr) {
        return null;
    }

    let stringifiedArray = "";

    arr.forEach((element,index) => {
        if(index !== 0) {
            stringifiedArray += ", ";
        }

        stringifiedArray += element;
    });

    return stringifiedArray
}

export function getScoreBackgroundColor(score) {
    if(!Number(score)) {
        return {
            "backgroundColor": "lightgrey",
            "color": "black"
        };
    }

    const scoreInt = Number(score);

    if(scoreInt < 0 || scoreInt > 10) {
        return null;
    }

    if(scoreInt <= 6) {
        return {
            "backgroundColor": "red",
            "color": "white"
        };
    } else if(score < 8) {
        return {
            "backgroundColor": "yellow",
            "color": "black"
        };
    } else if(score < 10) {
        return {
            "backgroundColor": "lightgreen",
            "color": "black"
        };
    }

    // Perfect 10s
    return {
        "backgroundColor": "gold",
        "color": "black"
    };
}

export function getStatusColor(status) {
    switch(status) {
        case "Wishlist": 
            return "purple";
        case "Backlog":
            return "red";
        case "In Progress":
            return "darkgoldenrod";
        case "Complete":
            return "green";
        default:
            return "orange";
    }
}