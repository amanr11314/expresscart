module.exports = {
    post: {
        tags: ['Product'],
        description: "Delete a product",
        operationId: 'deleteProduct',
        parameters: [],
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "Product id to delete the Product",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
                        },
                        "required": ["id"],
                        "example": {
                            "id": 58,
                        }
                    }
                },
            }
        },
        responses: {
            '204': {
                description: "No Content (Product Deleted Successfully)",
            },
            "400": {
                "description": "Bad Request. ID parameter is missing or invalid",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Error"
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
            '404': {
                description: "Product not found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                            example: {
                                message: "",
                                internal_code: "Invalid id"
                            }
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