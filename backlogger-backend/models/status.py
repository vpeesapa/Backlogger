from enum import Enum

class Status(Enum):
    BACKLOG = "Backlog"
    COMPLETE = "Complete"
    WISHLIST = "Wishlist"
    DROPPED = "Dropped"
    IN_PROGRESS = "In Progress"

    @classmethod
    def has_value(cls,value):
        return value in cls._value2member_map_