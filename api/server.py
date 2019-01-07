
import datetime
import json
import jwt
from functools import wraps
from flask import Flask, jsonify, request
from bson import json_util
from bcrypt import hashpw, gensalt, checkpw
from flask_pymongo import PyMongo, ObjectId
from schema.users import validate_user
from schema.debt import validate_debt


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'Jerry&Tristan'
app.config["JWT_ACCESS_TOKE_EXPIRES"] = datetime.timedelta(days=1)


# DATABASE
app.config['MONGO_DBNAME'] = 'fi-tracker'
app.config['MONGO_URI'] = 'mongodb://temilo:Jeremiah1010@ds111476.mlab.com:11476/fi-tracker'
mongo = PyMongo(app)


def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):

        token = request.headers['token']

        if token is None:
            print(token)
            resp = jsonify({'message': 'Token is missing!'})
            return resp, 403

        try:
            jwt.decode(token, app.config['SECRET_KEY'])
            resp = jsonify({'message': 'Token is valid!'})
            return resp, 201

        except:
            resp = jsonify({'message': 'Token is invalid'})
            return resp, 401

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
            {"user": user_email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=120)}, app.config['SECRET_KEY'])
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
def addDebt():
    form = request.form
    print(form)
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
        message = jsonify(
            {'validated': True, 'message': 'The Item has been added!'})
        return message, 201
    else:
        message = jsonify(
            {'validated': False, 'message': 'Bad Request Parameters! {}'.format(data['message'])})
        return message, 400


# Route to delete items from database
@app.route('/deleteitem', methods=['DELETE'])
def deleteDebt():
    debts = mongo.db.debts
    form = request.form
    debt = debts.find_one({'_id': ObjectId(form['id'])})

    if(debt):
        debts.delete_one(debt)
        message = jsonify({'Deleted': True, 'message': "Item was deleted"})
        return message, 201
    else:
        message = jsonify(
            {'Deleted': False, 'message': 'No item was found with that ID'})
        return message, 400


# Route to delete items from database
@app.route('/updateitem', methods=['PUT'])
def updateItem():
    debts = mongo.db.debts
    form = request.form
    item_data = {
        '$set': {
            'name': form['name'],
            'totalAmount': float(form['totalAmount']),
            'interest': float(form['interest']),
            'type': form['type'],
            'payment': float(form['payment']),
        }
    }
    debt = debts.find_one({'_id': ObjectId(form['id'])})

    if(debt):
        debts.update_one(debt, item_data)
        message = jsonify({'Updated': True, 'message': "Item succesfully updated"})
        return message, 201
    else:
        message = jsonify(
            {'Updated': False, 'message': 'Sorry Item could not be updated'})
        return message, 400


# Route to acquire all items from database
@app.route('/allDebts', methods=['GET'])
def allDebts():

    debts = mongo.db.debts.find()
    debts_sanitize = json.loads(json_util.dumps(debts))
    return jsonify(debts_sanitize)


@app.route('/getUser', methods=['GET'])
@token_required
def getUser():

    token = request.headers['token']
    jwt_cool = jwt.decode(token, app.config['SECRET_KEY'])
    user = jwt_cool
    print(user['user'])

    return jsonify({'message': 'test'})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
