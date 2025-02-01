"""Python Flask API Auth0 integration example
"""

from os import environ as env

from dotenv import load_dotenv, find_dotenv
from flask import Flask, jsonify, request
from authlib.integrations.flask_oauth2 import ResourceProtector
from validator import Auth0JWTBearerTokenValidator
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(
    "dev-kd6s251j4wb7g6mu.us.auth0.com",
    "https://playermanagement.com"
)
require_auth.register_token_validator(validator)

APP = Flask(__name__)

CORS(APP)

# MySQL Database Configuration
APP.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:IJ%40sqlpms1530@localhost/playerdb'
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(APP)

# Define Player Model
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.String(100))
    gender = db.Column(db.String(100))

# Create Tables (Run once)
with APP.app_context():
    db.create_all()

@APP.route("/api/public")
def public():
    """No access token required."""
    response = (
        "Hello from a public endpoint! You don't need to be"
        " authenticated to see this."
    )
    return jsonify(message=response)


@APP.route("/api/private")
@require_auth(None)
def private():
    """A valid access token is required."""
    response = (
        "Hello from a private endpoint! You need to be"
        " authenticated to see this."
    )
    return jsonify(message=response)


@APP.route("/api/private-scoped")
@require_auth("read:messages")
def private_scoped():
    """A valid access token and scope are required."""
    response = (
        "Hello from a private endpoint! You need to be"
        " authenticated and have a scope of read:messages to see"
        " this."
    )
    return jsonify(message=response)

#----------------- Player Management -----------------#

# Get All Players
@APP.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'age': p.age, 'gender': p.gender} for p in players])

# Add New Player
@APP.route('/players', methods=['POST'])
def add_player():
    data = request.json
    new_player = Player(name=data['name'], age=data['age'], gender=data['gender'])
    db.session.add(new_player)
    db.session.commit()
    return jsonify({'message': 'Player added successfully'}), 201

# Update Player
@APP.route('/players/<int:id>', methods=['PUT'])
def update_player(id):
    player = Player.query.get(id)
    data = request.json
    player.name = data['name']
    player.age = data['age']
    player.gender = data['gender']
    db.session.commit()
    return jsonify({'message': 'Player updated successfully'})

# Delete Player
@APP.route('/players/<int:id>', methods=['DELETE'])
def delete_player(id):
    player = Player.query.get(id)
    db.session.delete(player)
    db.session.commit()
    return jsonify({'message': 'Player deleted successfully'})

if __name__=='__main__':
    APP.run('localhost', 6060, debug=True)