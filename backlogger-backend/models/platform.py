from enum import Enum

class Platform(Enum):
    PC_STEAM = "PC (Steam)"
    NINTENDO_SWITCH = "Nintendo Switch"
    PC_EPIC = "PC (Epic)"
    PS5 = "PS5"
    XBOX_GAME_PASS = "Xbox Game Pass"
    PS4 = "PS4"
    NINTENDO_GAMEBOY = "Nintendo Gameboy"
    NINTENDO_DS = "Nintendo DS"
    NINTENDO_3DS = "Nintendo 3DS"

    @classmethod
    def has_value(cls,value):
        return value in cls._value2member_map_