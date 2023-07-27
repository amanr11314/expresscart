module.exports = {
    post: {
        tags: ['Cart CRUD opeartions'],
        description: "Remove Prouduct from Cart",
        operationId: 'deleteCartItem',
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "ProductId of product to remove from cart",
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
                "description": "Product removed to Cart",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CartUpdateResponse"
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