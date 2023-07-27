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

                "multipart/form-data": {
                    "schema": {
                        "$ref": "#/components/schemas/EditProductRequest"
                    },
                }
            }
        },
        responses: {
            '204': {
                description: "No Content (Product Updated Successfully)",
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