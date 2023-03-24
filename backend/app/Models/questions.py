from app import db
from app.Components import model

class Question(db.Model, model.Component):
    id = db.Column(db.Integer, primary_key=True)
    context = db.Column(db.Integer, db.ForeignKey('context.id'))
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    userAnswer = db.Column(db.Text, nullable=False)