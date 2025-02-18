# Dan's Phase 5 Project

## Overview

Welcome to MyCaddy! MyCaddy is an app that helps the avid golfer maintain access to their scorecards and favorite courses electronically. 

## Setup

Once in the directory, enter the server directory. From there, run:
- pipenv install && pipenv shell (enters the virtual environment)
- export FLASK_APP=app.py and export FLASK_RUN_PORT=5555
- flask db upgrade (generates the database)
- python app.py (runs the server)

Then, open a new terminal and enter the client directory. From there, run:
- npm install (download the necessary dependencies)
- npm start (opens the application)

## Using MyCaddy

You'll initially be taken to the login page. If you've never used MyCaddy, you'll need to create an account. Click on the Create Account button. Once there, enter the necessary information and click Create Account. You'll then be taken back to the login page.

Enter your login credentials and click the Log In button. You'll then be taken to the home page.

The Home page will feature two windows: one shows you career stats (number of rounds you've played, scoring metrics, etc.), and the other will show you your top 3 rounds based on score to par. You'll also notice the navigation bar at the top of your screen which will allow you to access the home, courses, and scorecards pages. You can also logout at any time using the logout button to the top right of your screen.

Courses - This shows you a list of the courses you've played. It shows some basic info like course name and address, as well as a course rating determined by you and an edit button to modify the course info. If you've designated a course as a favorite, the card will feature a gold star in the top left corner. To see additional course info like the website and google maps integration (coming soon!), simply click on the course card. 

Scorecards - the scorecards page houses all of your scorecards and shows the course played, number of holes, par, strokes, putts, and key scoring metrics. To create a new scorecard, simply click on + Add a Scorecard. From there, you'll be prompted to enter information about your round. If you're playing a course you haven't played before, select "Create New Course" from the course dropdown and additional inputs will populate for you to enter information about the course. Once completed, hit Submit Scorecard and the scorecard will be added to the scorecard section. 

Enjoy!