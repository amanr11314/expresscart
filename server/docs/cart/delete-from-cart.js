module.exports = {
    post: {
        tags: ['Cart'],
        description: "Remove Prouduct from Cart",
        operationId: 'deleteCartItem',
        security: [
            {
                "BearerAuth": []
            }
        ],
        "requestBody": {
            "description": "ProductId of product to remove from cart",
            "required": true,
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