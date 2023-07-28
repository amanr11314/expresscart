module.exports = {
    post: {
        tags: ['Auth'],
        description: "Clear refresh token and logout from server side",
        operationId: 'logout',
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
            '204': {
                description: "No Content (Logged out Successfully)",
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