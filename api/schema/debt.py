from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

user_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "totalAmount": {
            "type": "number"
        },
        "interest": {
            "type": "number"
        },
        'type': {
            'type': 'string'
        },
        'payment': {
            'type': 'number'
        }
    },
    "required": ["name", "totalAmount", "payment"],

    "additionalProperties": False
}


def validate_debt(data):
    try:
        validate(data, user_schema)
        return {'validated': True, 'message': 'Data was validated!'}
    except ValidationError as e:
        return {'validated': False, 'message': e}
    except SchemaError as e:
        return {'validated': False, 'message': e}
