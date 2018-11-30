from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

user_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"

        },
        "password": {
            "type": "string",
            "minLength": 8
        }
    },
    "required": ["email", "password"],

    "additionalProperties": False
}


def validate_user(data):
    try:
        validate(data, user_schema)
        return {'validated': True, 'message': 'Data was validated!'}
    except ValidationError as e:
        return {'validated': False, 'message': e}
    except SchemaError as e:
        return {'validated': False, 'message': e}
