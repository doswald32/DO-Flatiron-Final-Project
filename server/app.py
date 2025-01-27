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
    print("Inside Test Session:", session)
    if 'user_id' not in session:
        return "No current session initialized."
    return f"Session persists with user_id: {session['user_id']}."

@app.route("/clear")
def clear_session():
    print("Clear:", session)
    session.clear()
    print("Session cleared.")
    return "Session cleared"

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

        response = make_response(jsonify(user.to_dict()), 201)

        return response

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password): 
            session['user_id'] = user.id
            session.permanent = True  
            response = make_response(user.to_dict(), 200)
            response.set_cookie("user_id", str(user.id), httponly=True, samesite="Lax")
            return response
        else:
            return {"error": "Invalid username or password"}, 401
        
        
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
            else:
                return {"error": "User not found."}, 404
        else:
            return {"error": "Unauthenticated"}, 401
        

class LogoutResource(Resource):
    def delete(self):

        session.clear()

        response = make_response({"message": "Successfully logged out"}, 200)
        response.set_cookie("user_id", "", expires=0)  

        return response
    

    
api.add_resource(UserResource, '/users')
api.add_resource(CreateAccountResource, '/create_account')
api.add_resource(LoginResource, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(LogoutResource, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


