#!/usr/bin/env python3

# Standard library imports
from os import abort
from urllib import response

# Remote library imports
from flask import jsonify, make_response, request, session, redirect, url_for
from flask_restful import Api, Resource, abort
from authlib.integrations.flask_client import OAuth

# Local imports
from config import app, db, api
from api_key import *

# Add your model imports
from models import db, User, Course


api = Api(app)
oauth = OAuth(app)

google = oauth.register(
    name='google',
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid profile email'}
)

def handle_not_found(resource, resource_id):
    abort(404, message=f"{resource} with ID {resource_id} not found.")

@app.route('/test_session')
def test_session():
    if 'user_id' in session:
        return f"Session persists with user_id: {session['user_id']}"
    return "No session found."

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        users_to_dict = [user.to_dict() for user in users]

        return make_response(users_to_dict, 200)
    
class CourseResource(Resource):
    def get(self):
        courses = Course.query.all()
        courses_dict = [course.to_dict() for course in courses]
        response = make_response(courses_dict, 200)
        return response
    
    def delete(self, id):
        course = Course.query.filter(Course.id == id).first()
        if course:
            db.session.delete(course)
            db.session.commit()
        else: 
            handle_not_found("Course", id)
            return "Course not found."
        
        return {"message": f"Course {id} successfully deleted."}, 200


class CreateAccountResource(Resource):
    def post(self):
        
        data = request.get_json()

        user = User(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['username'],
            email = data['email']
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
    
# Login for Google
@app.route('/login/google')
def login_google():
    try:
        redirect_uri = url_for('authorize_google',_external=True)
        return google.authorize_redirect(redirect_uri)
    except Exception as e:
        app.logger.error(f"Error during login:{str(e)}")
        return "Error occured during login", 500


# Authorization for Google
@app.route('/authorize/google')
def authorize_google():
    try:
        token = google.authorize_access_token()
        userinfo_endpoint = google.server_metadata['userinfo_endpoint']
        response = google.get(userinfo_endpoint)
        user_info = response.json()
        email = user_info['email']

        user = User.query.filter_by(email=email).first()
        if not user:
            return "Error: user not found."
        
        session['user_id'] = user.id
        session['oauth_token'] = token
        app.logger.info(f"Session set with user ID: {user.id}")

        # Prepare the response with the necessary cookies
        frontend_url = "http://localhost:4000/login-success"
        response = make_response(redirect(frontend_url))
        response.set_cookie("user_id", str(user.id), httponly=True, samesite="Lax")
        
        return response
    except Exception as e:
        app.logger.error(f"Error during Google authorization: {str(e)}")
        return jsonify({"error": "An error occurred during Google authorization."}), 500

    
api.add_resource(UserResource, '/users')
api.add_resource(CourseResource, '/courses', '/courses/<int:id>')
api.add_resource(CreateAccountResource, '/create_account')
api.add_resource(LoginResource, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(LogoutResource, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


