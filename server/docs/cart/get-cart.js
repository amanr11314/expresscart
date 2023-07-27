module.exports = {
    get: {
        tags: ['Cart CRUD opeartions'],
        description: "Get all cart products",
        operationId: 'getCart',
        parameters: [],
        security: [
            {
                "BearerAuth": []
            }
        ],
        responses: {
            '200': {
                description: "Cart Products fetched",
                content: {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CartResponse"
                        }
                    }
                }
            },
            '204': {
                "description": "No Content (Cart is empty)",
            },
            "401": {
                "description": "Unauthorized. Missing or invalid token.",
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