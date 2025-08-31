from models.status import Status
from models.platform import Platform

class Constants:
    # Structures used to validate the input
    VALID_STATUS = {
        "backlog": Status.BACKLOG.value,
        "complete": Status.COMPLETE.value,
        "wishlist": Status.WISHLIST.value,
        "dropped": Status.DROPPED.value,
        "in_progress": Status.IN_PROGRESS.value
    }

    VALID_PLATFORMS = {
        "steam": Platform.PC_STEAM.value,
        "nintendo_switch": Platform.NINTENDO_SWITCH.value,
        "epic": Platform.PC_EPIC.value,
        "ps5": Platform.PS5.value,
        "xbox_game_pass": Platform.XBOX_GAME_PASS.value,
        "ps4": Platform.PS4.value,
        "nintendo_gameboy": Platform.NINTENDO_GAMEBOY.value,
        "nintendo_ds": Platform.NINTENDO_DS.value,
        "nintendo_3ds": Platform.NINTENDO_3DS.value
    }