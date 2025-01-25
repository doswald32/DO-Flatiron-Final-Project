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

api = Api(app)
oauth = OAuth(app)

# google = oauth.register()

@app.route('/test_session')
def test_session():
    ipdb.set_trace()
    if 'user_id' not in session:
        session['user_id'] = 123  # Dummy ID
        return "Session initialized."
    return f"Session persists with user_id: {session['user_id']}."

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
        user = User(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['username']
        )
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        ret_user = User.query.filter(User.username == user.username).first()
        session['user_id'] = ret_user.id
        ipdb.set_trace()

        return ret_user.to_dict(), 201

class LoginResource(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.password_hash == password:
                session['user_id'] = user.id
                return user.to_dict()
            else:
                return {'message': "Incorrect password"}, 401
        else:
            return {'message': 'Username not found'}, 401
    
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return make_response(jsonify(user.to_dict()), 200)
        else: 
            return {'message': '401: Not Authorized'}, 401
        

class LogoutResource(Resource):
    def delete(self):
        ipdb.set_trace()
        session.clear()
        return {'message': '204: No Content'}, 204
    

    
api.add_resource(UserResource, '/users')
api.add_resource(CreateAccountResource, '/create_account')
api.add_resource(LoginResource, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(LogoutResource, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


