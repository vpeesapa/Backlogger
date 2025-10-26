from core.exceptions import ValidationError
from core.logger import logger
from utils.constants import Constants
from utils.common_utils import custom_round

def validate_append_request(append_request):
    if "name" not in append_request:
        logger.error("The name of the new game should be present in the request")
        return False
    if append_request["name"] == "":
        logger.error("The name of the new game cannot be empty")
        return False
    
    if "cover_image_link" not in append_request:
        logger.error("The link to the cover image should be present in the request")
        return False
    if append_request["cover_image_link"] == "":
        logger.error("The link to the cover image cannot be empty")
        return False
    if not append_request["cover_image_link"].startswith("https://"):
        logger.error("The link to the cover image should be a valid URL")
        return False
    
    if "platform" not in append_request:
        logger.error("The platform of the new game should be present in the request")
        return False
    if append_request["platform"] not in Constants.VALID_PLATFORMS:
        logger.error("The platform of the new game is not a valid platform")
        return False
    
    if "developer" not in append_request:
        logger.error("The developer(s) of the new game should be present in the request")
        return False
    if not isinstance(append_request["developer"],list):
        logger.error("The developer(s) should be saved in a list")
        return False
    if len(append_request["developer"]) == 0:
        logger.error("The list of developers cannot be an empty string")
        return False
    if "" in append_request["developer"]:
        logger.error("A developer cannot be an empty list")
        return False
    
    if "year" not in append_request:
        logger.error("The year of release of the new game should be present in the request")
        return False
    if str(append_request["year"]) == "":
        logger.error("The release date cannot be an empty string")
        return False
    if str(append_request["year"]) != "-" and int(append_request["year"]) < 0:
        logger.error("The release date cannot be negative")
        return False
    
    if "completion_time" not in append_request:
        logger.error("The completion time of the new game should be present in the request")
        return False
    if str(append_request["completion_time"]) == "":
        logger.error("The completion time cannot be an empty string")
        return False
    if str(append_request["completion_time"]) != "-" and float(append_request["completion_time"]) < 0.0:
        logger.error("The completion time cannot be negative")
        return False
    
    if "status" not in append_request:
        logger.error("The status of the new game should be present in the request")
        return False
    if append_request["status"] not in Constants.VALID_STATUS:
        logger.error("The status of the new game is not a valid status")
        return False
    
    if "genres" not in append_request:
        logger.error("The genre(s) of the new game should be present in the request")
        return False
    if not isinstance(append_request["genres"],list):
        logger.error("The genre(s) should be saved in a list")
        return False
    if len(append_request["genres"]) == 0:
        logger.error("The list of genres cannot be an empty string")
        return False
    if "" in append_request["genres"]:
        logger.error("A genre cannot be an empty list")
        return False
    
    if "all_achievements" not in append_request:
        logger.error("The achievement status of the new game should be present in the request")
        return False
    if not isinstance(append_request["all_achievements"],bool):
        logger.error("The achievement status should be a boolean")
        return False
    
    if "score" not in append_request:
        logger.error("The score of the new game should be present in the request")
        return False
    if str(append_request["score"]) == "":
        logger.error("The score cannot be an empty string")
        return False
    if str(append_request["score"]) != "-" and (int(append_request["score"]) > 10 or int(append_request["score"]) < 0):
        logger.error("The score should be between 0 and 10")
        return False

    logger.info("The append request has been successfully validated!")
    return True
    


def enrich_append_request(append_request):
    if not validate_append_request(append_request):
        raise ValidationError(f"Error validating request: {append_request}")
    
    # Enrich the append request by calculating and saving the backloggd score
    score = append_request.get("score")
    backloggd_score = 0

    if score == "-":
        backloggd_score = "-"
    else:
        backloggd_score = custom_round(float(score)) / 2
    
    append_request["backloggd_score"] = backloggd_score

    # Enrich the platform and status to match values valid in the database
    append_request["platform"] = Constants.VALID_PLATFORMS[append_request["platform"]]
    append_request["status"] = Constants.VALID_STATUS[append_request["status"]]

    logger.info("The append request has been successfully enriched!")

    return append_request