#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Course, ScoreCard, Round

if __name__ == '__main__':
    with app.app_context():
        print("Clearing database...")
        User.query.delete()
        Course.query.delete()
        ScoreCard.query.delete()
        Round.query.delete()
        db.session.commit()

        print("Adding Users...")
        u1 = User(
            first_name="Dan",
            last_name="Oswald",
            username="doswald32",
            email="dan.oswald32@gmail.com",
        )
        u1.password_hash="password"

        u2 = User(
            first_name="Don",
            last_name="McGregor",
            username="dmcg3854",
            email="mcgred@nv.ccsd.net"
        )
        u2.password_hash="password"
        users = [u1, u2]
        db.session.add_all(users)
        db.session.commit()

        print("Adding Courses...")
        c1 = Course(
            name="City Park Golf Course",
            address="3181 E 23rd Ave, Denver, CO 80205",
            rating=8.7,
            favorite=True,
        )
        c2 = Course(
            name="Willis Case Golf Course",
            address="4999 Vrain St, Denver, CO 80212",
            rating=7.9,
            favorite=True,
        )
        c3 = Course(
            name="Evergreen Golf Course",
            address="29614 Upper Bear Creek Rd. Evergreen, CO 80439",
            rating=7.2,
            favorite=False,
        )
        c4 = Course(
            name="Overland Park Golf Course",
            address="1801 S. Huron St., Denver, CO 80223",
            rating=7.9,
            favorite=True,
        )
        c5 = Course(
            name="Kennedy Golf Course",
            address="10500 E. Hampden Ave., Denver, CO 80014",
            rating=7.1,
            favorite=True,
        )
        c6 = Course(
            name="Wellshire Golf Course",
            address="3333 S Colorado Blvd., Denver, CO 80222",
            rating=7.9,
            favorite=True,
        )
        courses = [c1, c2, c3, c4, c5, c6]
        db.session.add_all(courses)
        db.session.commit()

        print("Adding Scorecards...")
        s1 = ScoreCard(
            crs_yrds=6200,
            crs_par=72,
            usr_strokes=80,
            usr_scr_to_par=8,
            putts=35,
            bogey_worse=3,
            bogey=2,
            par=13,
            birdie=0,
            eagle=0,
            hoi=0,
        )
        s2 = ScoreCard(
            crs_yrds=6300,
            crs_par=72,
            usr_strokes=73,
            usr_scr_to_par=1,
            putts=30,
            bogey_worse=0,
            bogey=3,
            par=13,
            birdie=2,
            eagle=0,
            hoi=0,
        )
        scores = [s1, s2]
        db.session.add_all(scores)
        db.session.commit()

        print("Adding Rounds...")
        r1 = Round(
            date=date(2024, 1, 1),
            par_3=False,
            full_18=True,
            user=u1,
            course=c1,
            scorecard=s1,
        )
        r2 = Round(
            date=date(2024, 6, 6),
            par_3=False,
            full_18=True,
            user=u2,
            course=c3,
            scorecard=s2,
        )
        rounds = [r1, r2]
        db.session.add_all(rounds)
        db.session.commit()

        print("Done seeding!")
