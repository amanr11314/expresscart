module.exports = {
    post: {
        tags: ['Product'],
        description: "Create a new product",
        operationId: 'createProduct',
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "Product data to create",
            "required": true,
            "content": {
                "multipart/form-data": {
                    "schema": {
                        "$ref": "#/components/schemas/CreateProductRequest"
                    },
                }
            }
        },
        responses: {
            '200': {
                description: "Product Created",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Product'
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