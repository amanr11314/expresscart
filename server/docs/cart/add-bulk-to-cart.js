module.exports = {
    post: {
        tags: ['Cart'],
        description: "Add Prouduct to Cart",
        operationId: 'addBulkToCart',
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "ProductIds of products to bulk add to cart",
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/BulkAddToCartRequest"
                    }
                }
            }
        },
        responses: {
            '200': {
                "description": "Products Added to Cart",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/BulkAddToCartResponse"
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