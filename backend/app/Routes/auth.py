from flask import request
from flask_login import login_user, login_required, logout_user, current_user
from app import app
from app.Models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from app.Components.response import Response

@app.route('/signup', methods = ['POST'])
def signup():
    if request.method == 'POST':
        req = request.get_json()

        # check if email already exists
        if not User.query.filter_by(email=req['email']).first():
            user = User(
                firstName = req['firstName'],
                lastName = req['lastName'],
                email = req['email'],
                password = generate_password_hash(req['password'])
            )
            
            user.create()

            # login user after successful signup
            login_user(user, remember=True)

            return Response(
                status=201
            )
        else:
            return Response(
                status=409
            )

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        req = request.get_json()
        email = req['email']
        password = req['password']

        user = User.query.filter_by(email=email).first()

        # check if user does not exists
        if not user:
            return Response(
                status=404
            )
        # check if password is incorrect
        if not check_password_hash(user.password, password):   
            return Response(
                status=403
            )

        login_user(user, remember=True)

        return Response(
            status=200
        )
    if request.method == 'GET':
        if not current_user.is_authenticated:
            return Response(
                status=200,
                data= False
            )
        else:
            return Response(
                status=200,
                data= True
            )

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()

    return Response(
        status=200
    )