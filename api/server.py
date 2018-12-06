
import datetime
import json
from functools import wraps
from flask import Flask, jsonify, request
from bson import json_util, ObjectId
from bcrypt import hashpw, gensalt, checkpw
from flask_pymongo import PyMongo
import jwt
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
# app.json_encoder = JSONEncoder


def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        token = request.headers['Token']
        print(request.headers)

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Token is invalid'}), 403
        return fn(*args, **kwargs)
    return wrapper


@app.route("/")
def index():

    return "back-end up"


# Auth / Login Route
@app.route('/auth', methods=['POST'])
def auth():
    ''' Auth Endpoint'''

    # data = validate_user(request.get_json())

    user_email = request.form['email']
    user_password = request.form['password'].encode('utf-8')

    user = mongo.db.users.find_one({'email': user_email})

    # Check if user exist in database and then verifies pw
    if user and checkpw(user_password, user['password']):
        del user['password']
        token = jwt.encode(
            {"user": user_email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        user['token'] = token.decode('UTF-8')
        user_sanitize = json.loads(json_util.dumps(user))
        return jsonify({'validated': True, 'user': user_sanitize}), 200
    else:
        message = {'validated': False, 'data': 'Invalid username or Password'}
        return jsonify(message), 401


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
        token = jwt.encode(
            {"user": form_data['email'], "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    
        return jsonify({'validated': True,
                        'message': 'Logged in as {}'.format(form_data['email']),
                        'token': token.decode('UTF-8')}), 200
    else:
        return jsonify(({'validated': False, 'message': 'Bad Request Parameter! {}'.format(data['message'])})), 400


# Protected Route to add debts to database
@app.route('/addDebt', methods=['POST'])
@token_required
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
@token_required
def allDebts():

    debts = mongo.db.debts.find()
    debts_sanitize = json.loads(json_util.dumps(debts))
    return jsonify(debts_sanitize)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
