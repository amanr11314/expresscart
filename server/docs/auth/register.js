module.exports = {
    post: {
        tags: ['Auth'],
        description: "User SignIn using email and password",
        operationId: 'register',
        parameters: [],
        "requestBody": {
            "description": "User Data to register",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/SignUpRequest"
                    },
                }
            }
        },
        responses: {
            '201': {
                description: "User created Successfully",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/SignUpResponse"
                        }
                    }
                }
            },
            "400": {
                "description": "Invalid email id",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Error"
                        }
                    }
                }
            },
            "404": {
                "description": "Email Already Taken",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Error"
                        }
                    }
                }
            },
            "500": {
                "description": "Internal Server Error. An error occurred while processing the request.",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Error"
                        }
                    }
                }
            }
        }
    }
}