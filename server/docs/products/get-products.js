module.exports = {
    get: {
        tags: ['Product CRUD operations'],
        description: "Get all products",
        operationId: 'getProducts',
        parameters: [],
        security: [
            {
                "BearerAuth": []
            }
        ],
        responses: {
            '200': {
                description: "Products fetched",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ProductList'
                        }
                    }
                }
            },
            '204': {
                "description": "Products fetched list empty",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/SuccessNoContent"
                        }
                    }
                }
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