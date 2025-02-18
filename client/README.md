# Dan's Phase 5 Final Project

## Overview

I'm, an avid golfer during the warmer months of the year, and typically, I'll use paper scorecards as I save them as a collection of sorts to help me remember where I've played and how I've scored. However, I've always wanted a way to summarize the data from all of these scorecards into a database that would help me easily locate my top rounds and track key scoring metrics. For that reason, I've created MyCaddy, which allows you the ability to keep track of your favorite golf courses and easily access all of the rounds you've played. 

## Requirements to use the app

Once in the app's main directory, enter the 'server' directory. From there, run:

- pipenv install && pipenv shell (enter your virtual environment)
- export FLASK_APP=app.py and export FLASK_RUN_PORT=5555 
- flask db upgrade (generates the database)
- python app.py (opens the server)

Then, open another terminal and enter the 'client' directory. From there, run:

- npm install (downloads the necessary dependencies)
- npm start (opens the application)

## Logging In

If this is your first time using the app, you'll first need to create an account. Click on the Create Account button to be taken to the Create Account screen. From there, enter the necessary information and click the "Create Account" button. When the account is successfully created, you'll be taken back the sign in screen to log in using your username and password. 

If you've already created a user account, you can use the Sign in with Google button to log in and be authenticated with your gmail address. 

## Using the app

Once logged in, you'll see some options in the navigation bar at the top of your screen. You'll have access to the home, courses, and scorecards pages (you can also logout using the button at the top right of your screen). 

Home Page - here you'll see some summary data. There are two windows: one which shows you a summary of key stats from all of your rounds played, and another which shows your top three rounds based on your total score. 

Courses - here you'll find a list of the courses you've played. Each course card shows you basic info about the course (name, address, etc.) and also shows you a course rating, given by you, and the ability to edit the course's info using the edit button. The course card also features a star in the top left hand corner if you've designated a particular course as a "favorite". To see additional info about the course including the website and google maps location (feature coming soon!), simply click on the course card itself. 

Scorecards - this section houses each of your submitted scorecards along with the course you played, how many holes, the course par, your score, and associated scoring data (strokes, putts, etc.). To add a scorecard, simply click on the card that says "+ Add a Scorecard". This will open a template for you to enter the information associated with your round.

New Scorecard - you'll notice two buttons in the new scorecard: Par 3: OFF and 9 Holes. Clicking on the Par 3 button designates if the course you're playing is a Par 3. If it is, the course automatically designates 9 holes. Clicking on the button that currently says 9 Holes will toggle the scorecard to feature 18 holes. This is how you designate if you played 9 or 18. The 'select a course' dropdown allows you to choose from courses you've already played. If you've played a course that's not yet in the database, simply choose the 'create new course' option. This will add additional inputs for you to enter the course information. From there, just enter the date played as well as the info associated with each hole you played (par, strokes, and putts) and then hit submit scorecard. The app will add the course to your courses section and the scorecard will be added to your scorecards. 

Enjoy!