
import datetime
import json
from flask import Flask, jsonify, request
from bson import json_util, ObjectId
from bcrypt import hashpw, gensalt, checkpw
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, create_refresh_token, jwt_refresh_token_required, jwt_required
from schema.users import validate_user
from schema.debt import validate_debt


class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'Jerry&Tristan'
# app.config['JWT_SECRET_KEY'] = os.environ.get('Jerry&Tristan')
app.config["JWT_ACCESS_TOKE_EXPIRES"] = datetime.timedelta(days=1)


# DATABASE
app.config['MONGO_DBNAME'] = 'fi-tracker'
app.config['MONGO_URI'] = 'mongodb://temilo:Jeremiah1010@ds111476.mlab.com:11476/fi-tracker'

mongo = PyMongo(app)
jwt = JWTManager(app)
# app.json_encoder = JSONEncoder


@app.route("/")
def index():

    return "back-end up"


# Auth / Login Route
@app.route('/auth', methods=['POST'])
def auth_user():
    ''' Auth Endpoint'''

    # data = validate_user(request.get_json())
    data = {
        'email': request.form['email'],
        'password': request.form['password']
    }

    user_password = data['password'].encode('utf-8')

    user = mongo.db.users.find_one({'email': data['email']})

    # Check if user exist in database and then verifies pw
    if user and checkpw(user_password, user['password']):
        del user['password']
        access_token = create_access_token(identity=data['email'])
        refresh_token = create_refresh_token(identity=data['email'])
        user['access_token'] = access_token
        user['refresh_token'] = refresh_token
        user_sanitize = json.loads(json_util.dumps(user))
        return jsonify({'validated': True, 'user': user_sanitize}), 200
    else:
        message = {'validated': False, 'data': 'Invalid username or Password'}
        return jsonify(message), 401

# Refresh Route


@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    ''' refresh token endpoint '''
    current_user = get_jwt_identity()
    ret = {
        'token': create_access_token(identy=current_user)
    }
    return jsonify({'validated': True, 'data': ret}), 200


@jwt.unauthorized_loader
def unathorized_reponse(callback):
    return jsonify({
        'validated': False,
        'message': 'Missing Authorization Header'
    }), 401


# Registration data
@app.route('/register', methods=['POST'])
def register():
    '''  register user endpoint '''
    form = request.form
    form_data = {
        'name': form['name'],
        'email': form['email'],
        'password': form['password']
    }

    users = mongo.db.users
    data = validate_user(form_data)

    if data['validated']:
        form_data['password'] = hashpw(
            form_data['password'].encode('utf-8'), gensalt())
        users.insert_one(form_data)
        access_token = create_access_token(identity=data['email'])
        refresh_token = create_refresh_token(identity=data['email'])
        return jsonify({'validated': True,
                        'message': 'Logged in as {}'.format(form_data['email']),
                        'access_token': access_token,
                        'refresh_token': refresh_token}), 200

    else:

        return jsonify(({'validated': False, 'message': 'Bad Request Parameter! {}'.format(data['message'])})), 400


# Protected Route to add debts to database
@app.route('/addDebt', methods=['POST'])
@jwt_required
def addDebt():
    form = request.form
    form_data = {
        'name': form['name'],
        'totalAmount': float(form['totalAmount']),
        'interest': float(form['interest']),
        'type': form['type'],
        'payment': float(form['payment']),

    }

    debts = mongo.db.debts

    # Call function to validate data through schema
    data = validate_debt(form_data)

    if data['validated']:
        debts.insert_one(form_data)
        return jsonify({'validated': True, 'message': 'The debt has been added!'})
    else:
        return jsonify({'validated': False, 'message': 'Bad Request Parameters! {}'.format(data['message'])})


@app.route('/allDebts', methods=['GET'])
@jwt_required
def allDebts():
    debts = mongo.db.debts.find()
    debts_sanitize = json.loads(json_util.dumps(debts))
    return jsonify(debts_sanitize)




if __name__ == '__main__':
    app.run(host='0.0.0.0')
