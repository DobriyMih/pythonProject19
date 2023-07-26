from database import User
from werkzeug.security import generate_password_hash
from communicate_with_db import add_item_to_db

pwd = generate_password_hash("admin")
admin = User("admin", "admin@admin.com", pwd)
add_item_to_db(admin)