from flask import Flask
from flask_cors import CORS

app = Flask (__name__)
app.secret_key = "secret_key"
CORS(app)
from . import routes

app.config["SECRET_KEY"] = secrets.token_hex(16)
JWTManager(app)
app.config["JWT_SECRET_KEY"] = secrets.token_hex(16)