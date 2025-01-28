#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Course

if __name__ == '__main__':
    with app.app_context():
        print("Clearing database...")
        User.query.delete()
        Course.query.delete()
        db.session.commit()

        print("Adding Users...")
        u1 = User(
            first_name="Dan",
            last_name="Oswald",
            username="doswald32",
            email="dan.oswald32@gmail.com",
        )
        u1.password_hash = "password"
        db.session.add(u1)
        db.session.commit()

        print("Adding Courses...")
        c1 = Course(
            name="Arrowhead Golf Course",
            address="10850 Sundown Trail, Littleton, CO 80125",
            rating=8.7,
            favorite=True,
        )
        c2 = Course(
            name="Willis Case Golf Course",
            address="4999 Vrain St, Denver, CO 80212",
            rating=7.9,
            favorite=True,
        )
        courses = [c1, c2]
        db.session.add_all(courses)
        db.session.commit()

        print("Done seeding!")
