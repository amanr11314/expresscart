module.exports = {
    post: {
        tags: ['Auth'],
        description: "User SignIn using email and password",
        operationId: 'signIn',
        parameters: [],
        "requestBody": {
            "description": "SignIn Data",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/SignInRequest"
                    },
                }
            }
        },
        responses: {
            '200': {
                description: "Logged In Successfully",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/SignInResponse"
                        }
                    }
                }
            },
            "401": {
                "description": "Unauthorized (Invalid Credentials)",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/UnauthorizedError"
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