module.exports = {
    post: {
        tags: ['Cart CRUD opeartions'],
        description: "Add Prouduct to Cart",
        operationId: 'addToCart',
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "ProductId of product to add to cart",
            "content": {
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AddToCartRequest"
                    }
                }
            }
        },
        responses: {
            '200': {
                "description": "Product Added to Cart",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/AddToCartResponse"
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