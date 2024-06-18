"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def getUser():
    user_body = User.query.all()
    user = list(map(lambda u: u.serialize(), user_body))

    return jsonify(user), 200

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    user = User.query.filter_by(email = body['email']).first()
    
    if user is None:
        user = User(email = body['email'], password = body['password'], username =body['username'])
        db.session.add(user)
        db.session.commit()
        response_body = {
            "msg": "User Created"
        }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "This user is already exist"}),401
    

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"})
    
    user = User.query.filter_by(email = email).first()

    if user is None  or user.password != password:
        return jsonify({"msg": "Bad email or password"})
    
    access_token = create_access_token(identity = user.id)

    response_body = ({
        "access_token": access_token,
    })

    return(response_body),200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()

    current_user = User.query.get(current_user_id)

    if current_user is None:
        return jsonify({"msg": "User not found"}),404
    
    return jsonify({
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username
    }),200
