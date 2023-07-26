module.exports = {
    get: {
        tags: ['Product CRUD operations'],
        description: "Get a Product details by id",
        operationId: "getProduct",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id"
                },
                required: true,
                description: "A single product id"
            }
        ],
        security: [
            {
                "BearerAuth": []
            }
        ],
        responses: {
            '200': {
                description: "Product is obtained",
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/Product"
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