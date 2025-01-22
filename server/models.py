from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String)
#     last_name = db.Column(db.String)
#     username = db.Column(db.String)
#     password = db.Column(db.String)

#     def __repr__(self):
#         return f'<User {self.id}: {self.first_name} {self.last_name}; {self.username}>'
