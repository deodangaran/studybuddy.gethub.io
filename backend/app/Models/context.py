from app import db
from app.Components import model
from sqlalchemy.sql import func

class Context(db.Model, model.Component):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('user.id'))

    subject = db.Column(db.String(64), nullable=False)
    topic = db.Column(db.String(64), nullable=False)
    context = db.Column(db.Text, nullable=False)
    score = db.Column(db.Integer)

    dateCreated = db.Column(db.TIMESTAMP, server_default=func.now())



