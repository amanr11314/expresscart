module.exports = {
    post: {
        tags: ['Auth'],
        description: "Generating new token",
        operationId: 'refreshToken',
        parameters: [],
        "requestBody": {
            "description": "Currently stored refresh token",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "token": {
                                "type": "string",
                            },
                        },
                        "required": ["token"]
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Logged In Successfully",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "accessToken": {
                                    "type": "string",
                                },
                                "refreshToken": {
                                    "type": "string",
                                },
                            }
                        }
                    }
                }
            },
            "401": {
                "description": "Unauthorized",
            },
            "403": {
                "description": "Forbidden (Invalid Token)",
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