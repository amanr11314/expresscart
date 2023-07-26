module.exports = {
    post: {
        tags: ['Product CRUD operations'],
        description: "Create a new product",
        operationId: 'createProduct',
        parameters: [],
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "Product data to create",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "title": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            },
                            "price": {
                                "type": "number"
                            },
                            "file": {
                                "type": "string",
                                "format": "binary"
                            }
                        },
                        "required": ["title", "description", "price"],
                        "example": {
                            "title": "Sample Product",
                            "description": "This is a sample product",
                            "price": 99.99
                        }
                    }
                },
                "multipart/form-data": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "title": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            },
                            "price": {
                                "type": "number"
                            },
                            "file": {
                                "type": "string",
                                "format": "binary"
                            }
                        },
                        "required": ["title", "description", "price"],
                        "example": {
                            "title": "Sample Product",
                            "description": "This is a sample product",
                            "price": 99.99
                        }
                    }
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