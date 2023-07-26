module.exports = {
    post: {
        tags: ['Product CRUD operations'],
        description: "Edit a product",
        operationId: 'editProduct',
        parameters: [],
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "Product data to edit",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
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
                        "required": ["id"],
                        "oneOf": [
                            {
                                "required": ["title"]
                            },
                            {
                                "required": ["description"]
                            },
                            {
                                "required": ["price"]
                            }
                        ],
                        "example": {
                            "id": 58,
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
                            "id": {
                                "type": "string"
                            },
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
                        "required": ["id"],
                        "oneOf": [
                            {
                                "required": ["title"]
                            },
                            {
                                "required": ["description"]
                            },
                            {
                                "required": ["price"]
                            }
                        ],
                        "example": {
                            "id": 58,
                            "title": "Sample Product",
                            "description": "This is a sample product",
                            "price": 99.99
                        }
                    }
                }
            }
        },
        responses: {
            '204': {
                description: "Product Updated",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SuccessNoContent',
                            example: {
                                msg: 'Product updated successfully',
                            }
                        }
                    }
                }
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