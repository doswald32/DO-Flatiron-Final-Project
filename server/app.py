#!/usr/bin/env python3
import ipdb
# Standard library imports
from os import abort
from urllib import response

# Remote library imports
from flask import jsonify, make_response, request, session, redirect, url_for
from flask_restful import Api, Resource, abort
from authlib.integrations.flask_client import OAuth
from datetime import datetime

# Local imports
from config import app, db, api
from api_key import *

# Add your model imports
from models import db, User, Course, ScoreCard, Round


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

def handle_error(message):
    return jsonify({"error": message}), 400

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class UserResource(Resource):
    def get(self, id=None):
        if id is None:
            users = User.query.all()
            users_to_dict = [user.to_dict() for user in users]
            return make_response(users_to_dict, 200)
        else:
            user = User.query.filter(User.id == id).first()
            return make_response(user.to_dict(), 200)


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
        print("Session User ID:", user_id)
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
        redirect_uri = url_for('authorize_google', _external=True)
        print("In login...")
        return google.authorize_redirect(redirect_uri)
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Error occurred during login"}), 500


# Authorization for Google
@app.route('/authorize/google')
def authorize_google():
    try:
        print("In authorize...")
        token = google.authorize_access_token()
        userinfo_endpoint = google.server_metadata['userinfo_endpoint']
        response = google.get(userinfo_endpoint)
        user_info = response.json()
        email = user_info['email']

        user = User.query.filter_by(email=email).first()
        ipdb.set_trace()
        if not user:
            return "Error: user not found."
        
        session['user_id'] = user.id
        session['oauth_token'] = token
        print(f"Google Auth: Session user ID: {session.get('user_id')}")

        return jsonify({
            "message": "Authentication successful",
            "user": user.to_dict()
        }), 200
    except Exception as e:
        app.logger.error(f"Error during Google authorization: {str(e)}")
        return jsonify({"error": "An error occurred during Google authorization."}), 500


class CourseResource(Resource):
    def get(self, id):
        if id is None:
            courses = Course.query.all()
            courses_dict = [course.to_dict() for course in courses]
            response = make_response(courses_dict, 200)
            return response
        else:
            course = Course.query.filter(Course.id == id).first()
            return make_response(course.to_dict(), 200)
    
    def post(self):
        data = request.get_json()
        course = Course(
            name=data['newCourse']['name'],
            address=data['newCourse']['address'],
            rating=data['newCourse']['rating'],
            favorite=data['newCourse']['favorite']
        )

        db.session.add(course)
        db.session.commit()

        return make_response(jsonify(course.to_dict()), 200)
    
    def patch(self, id):
        course = Course.query.filter(Course.id == id).first()
        if not course:
            return {"error": f"Course with ID {id} not found."}, 404
        
        try:
            data = request.get_json()
            course.name = data['name']
            course.address = data['address']
            course.rating = float(data['rating'])
            course.favorite = bool(data['favorite'])

            db.session.commit()

            return make_response(course.to_dict(), 200)

        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error updating course: {str(e)}")

    def delete(self, id):
        course = Course.query.filter(Course.id == id).first()
        if course:
            db.session.delete(course)
            db.session.commit()
        else: 
            handle_not_found("Course", id)
            return "Course not found."
        
        return {"message": f"Course {id} successfully deleted."}, 200
    

class ScoreCardResource(Resource):
    def get(self, id=None):
        if id is None:
            scorecards = [scorecard.to_dict() for scorecard in ScoreCard.query.all()]
            return make_response(scorecards, 200)
        else:
            scorecard = ScoreCard.query.filter(ScoreCard.id == id).first()
            if not scorecard:
                handle_not_found("Scorecard", id)
            return make_response(scorecard.to_dict(), 200)
        
    def post(self):
        data = request.get_json()
        score = ScoreCard(
            crs_par = data['total_par'],
            usr_strokes = data['total_strokes'],
            usr_scr_to_par = int(int(data['total_strokes']) - int(data['total_par'])),
            putts = data['total_putts'],
            bogey_worse = data['stats']['bogey_worse'],
            bogey = data['stats']['bogeys'],
            par = data['stats']['pars'],
            birdie = data['stats']['birdies'],
            eagle = data['stats']['eagles'],
            hoi = data['stats']['holeInOnes']
        )
        db.session.add(score)
        db.session.commit()

        return make_response(jsonify(score.to_dict()), 200)
    
    def delete(self, id):
        score = ScoreCard.query.filter(ScoreCard.id == id).first()
        if not score:
            return {"error": f"Scorecard with ID {id} not found."}, 404
        try:
            Round.query.filter(Round.scorecard_id == id).delete()
            db.session.delete(score)
            db.session.commit()
            return {"message": f"Scorecard {id} and its associated round were successfully deleted."}
        except Exception as e:
            db.session.rollback()
            return {"error": f"Error deleting scorecard: {str(e)}"}, 500
    

class RoundResource(Resource):
    def get(self, id=None):
        if id is None:
            rounds = [round.to_dict() for round in Round.query.all()]
            return make_response(rounds, 200)
        else:
            round = Round.query.filter(Round.id == id).first()
            if not round:
                return handle_not_found("Round", id)
            return make_response(round.to_dict(), 200)
        
    def post(self):
        data = request.get_json()
        date = datetime.strptime(data['date'], "%Y-%m-%d").date()
        round = Round(
            date = date,
            par_3 = data['is_par3'],
            full_18 = data['full_18'],
            user_id = data['user_id'],
            course_id = data['course_id'],
            scorecard_id = data['scorecard_id']
        )
        db.session.add(round)
        db.session.commit()

        return make_response(round.to_dict(), 200)
    

api.add_resource(UserResource, '/users', '/users/<int:id>')
api.add_resource(CourseResource, '/courses', '/courses/<int:id>')
api.add_resource(CreateAccountResource, '/create_account')
api.add_resource(LoginResource, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(LogoutResource, '/logout')
api.add_resource(ScoreCardResource, '/scorecards', '/scorecards/<int:id>')
api.add_resource(RoundResource, '/rounds', '/rounds/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


