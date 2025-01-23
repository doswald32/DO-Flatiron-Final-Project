#!/usr/bin/env python3

# Standard library imports
import ipdb
# Remote library imports
from flask import Flask, jsonify, make_response, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from authlib.integrations.flask_client import OAuth

# Local imports
from config import app, db, api

# Add your model imports
from models import db, User

from api_key import *

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db=SQLAlchemy(metadata=metadata)
# migrate = Migrate(app, db)
# db.init_app(app)

api = Api(app)

# CORS(app)

oauth = OAuth(app)

# google = oauth.register()


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        users_to_dict = [user.to_dict() for user in users]

        return make_response(users_to_dict, 200)

class CreateAccountResource(Resource):
    def post(self):

        data = request.get_json()
        ipdb.set_trace()
        user = User(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['username'],
            password = data['password'],
        )

        db.session.add(user)
        db.session.commit()

        return {'message': f'{user.username} successfully added!'}, 201

class LoginResource(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json()['username']).first()
        session['user_id'] = user.id

        return user.to_dict()
    
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else: 
            return {'message': '401: Not Authorized'}, 401
    
api.add_resource(UserResource, '/users')
api.add_resource(CreateAccountResource, '/create_account')
api.add_resource(LoginResource, '/login')
api.add_resource(CheckSession, '/check_session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


