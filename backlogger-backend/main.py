from core.config import Config
from api import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True,port=Config.BACKEND_PORT_NUMBER)