import logging

from .config import Config

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

# File handler
file_handler = logging.FileHandler(Config.LOGGING_FILE_NAME)
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

# Add both the handlers to the logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)