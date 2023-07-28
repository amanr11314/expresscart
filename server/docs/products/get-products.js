module.exports = {
    get: {
        tags: ['Product'],
        description: "Get all products",
        operationId: 'getProducts',
        parameters: [
            {
                "name": "search",
                "in": "query",
                "description": "Filter products by search query (optional)",
                "required": false,
                "schema": {
                    "type": "string"
                }
            },
            {
                "name": "col",
                "in": "query",
                "description": "Sort column (optional)",
                "required": false,
                "schema": {
                    "type": "string"
                }
            },
            {
                "name": "order",
                "in": "query",
                "description": "Sort order (optional)",
                "required": false,
                "schema": {
                    "type": "string",
                    "enum": ["asc", "desc"]
                }
            }
        ],
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
                        "schema": {
                            "type": "object",
                            "properties": {
                                "products": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '204': {
                "description": "No Content (Products fetched list empty)",
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