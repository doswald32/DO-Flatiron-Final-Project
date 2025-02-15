from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-rounds.user',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=True)
    last_name = db.Column(db.String, nullable=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=True)
    email = db.Column(db.String, unique=True, nullable=True)

    rounds = db.relationship('Round', back_populates='user', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.id}: {self.first_name} {self.last_name}; {self.username}>'


class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    serialize_rules = ('-rounds.course',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    favorite = db.Column(db.Boolean)

    rounds = db.relationship('Round', back_populates='course', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Course {self.id}, {self.name}, Address: {self.address}, Rating: {self.rating}, Favorite: {self.favorite}>'


class Round(db.Model, SerializerMixin):
    __tablename__ = 'rounds'

    serialize_rules = ('-user.rounds', '-course.rounds', '-scorecard.round',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    par_3 = db.Column(db.Boolean)
    full_18 = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    scorecard_id = db.Column(db.Integer, db.ForeignKey('scorecards.id'), nullable=False)

    user = db.relationship('User', back_populates='rounds')
    course = db.relationship('Course', back_populates='rounds')
    scorecard = db.relationship('ScoreCard', back_populates='round', uselist=False)

    def __repr__(self):
        return f'<Round {self.id}, Date: {self.date}>'

class ScoreCard(db.Model, SerializerMixin):
    __tablename__ = 'scorecards'

    serialize_rules = ('-round.scorecard',)

    id = db.Column(db.Integer, primary_key=True)
    crs_par = db.Column(db.Integer)
    usr_strokes = db.Column(db.Integer)
    usr_scr_to_par = db.Column(db.Integer)
    putts = db.Column(db.Integer)
    bogey_worse = db.Column(db.Integer)
    bogey = db.Column(db.Integer)
    par = db.Column(db.Integer)
    birdie = db.Column(db.Integer)
    eagle = db.Column(db.Integer)
    hoi = db.Column(db.Integer)

    round = db.relationship('Round', back_populates='scorecard', uselist=False)

    def __repr__(self):
        return f'''<ScoreCard {self.id}, 
        Par: {self.crs_par},
        Strokes: {self.usr_strokes},
        Score to Par: {self.usr_scr_to_par},
        Putts: {self.putts},
        Bogey+: {self.bogey_worse},
        Bogies: {self.bogey},
        Pars: {self.par},
        Birdies: {self.birdie},
        Eagles: {self.eagle},
        Holes-in-One: {self.hoi}>'''
