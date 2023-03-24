from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisisakey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)

from app import Routes
from app import Models
from app.T5 import t5model
t5model.initialize()

# @app.before_first_request
# def create_tables():
#     #db.drop_all()
#     db.create_all()
#     db.session.commit()

@login_manager.user_loader
def load_user(user_id):
    return Models.user.User.query.get(int(user_id))