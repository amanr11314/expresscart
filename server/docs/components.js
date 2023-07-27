
module.exports = {
    "components": {
        "schemas": {
            "UnauthorizedError": {
                "type": "object",
                "properties": {
                    "statusCode": {
                        "type": "integer",
                        "example": 401
                    },
                    "error": {
                        "type": "string",
                        "example": "Unauthorized"
                    },
                    "message": {
                        "type": "string",
                        "example": "Missing or invalid token"
                    }
                }
            },
            "Error": {
                "type": 'object',
                "properties": {
                    "message": {
                        "type": 'string'
                    },
                    "internal_code": {
                        "type": 'string'
                    }
                }
            },
            "id": {
                "type": 'string',
                "description": "An id of a Model",
                "example": "58"
            },
            "Product": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "example": "58"
                    },
                    "title": {
                        "type": "string",
                        "example": "Oppo reno 5g"
                    },
                    "description": {
                        "type": "string",
                        "example": "gfbghnfh"
                    },
                    "price": {
                        "type": "number",
                        "example": 223
                    },
                    "imgUrl": {
                        "type": "string",
                        "example": "file-1689778131181.png"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2023-07-19T14:48:51.198Z"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2023-07-19T14:48:51.198Z"
                    },
                    "UserId": {
                        "type": "string",
                        "nullable": true,
                        "example": null
                    },
                    "User": {
                        "type": "object",
                        "nullable": true
                    }
                }
            },
            "ProductList": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/Product"
                },
                "title": "Productlist array<Product>"
            },
            "CreateProductRequest": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "example": "Oppo reno 5g",
                        "description": "Name of the product"
                    },
                    "description": {
                        "type": "string",
                        "example": "gfbghnfh",
                        "description": "Description of the product"
                    },
                    "price": {
                        "type": "number",
                        "example": 223,
                        "description": "Price of the product"
                    },
                    "file": {
                        "type": "string",
                        "format": "binary",
                        "description": "Image file of the product"
                    }
                },
                "required": ["title", "description", "price"]
            },
            "EditProductRequest": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "Unique id of the product"
                    },
                    "title": {
                        "type": "string",
                        "example": "Oppo reno 5g",
                        "description": "Name of the product"
                    },
                    "description": {
                        "type": "string",
                        "example": "gfbghnfh",
                        "description": "Description of the product"
                    },
                    "price": {
                        "type": "number",
                        "example": 223,
                        "description": "Price of the product"
                    },
                    "file": {
                        "type": "string",
                        "format": "binary",
                        "description": "Image file of the product"
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
                    "id": "58",
                    "title": "Sample Product",
                    "description": "This is a sample product",
                    "price": 99.99
                }
            },
            "CartItem": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "example": "290"
                    },
                    "quantity": {
                        "type": "integer",
                        "example": 1
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2023-07-27T13:44:09.276Z"
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2023-07-27T13:44:09.276Z"
                    },
                    "CartId": {
                        "type": "string",
                        "example": "4"
                    },
                    "ProductId": {
                        "type": "string",
                        "example": "90"
                    },
                    // "Product": {
                    //     "$ref": "#/components/schemas/Product"
                    // }
                }
            },
            "CartItemResponse": {
                "allOf": [
                    {
                        "$ref": "#/components/schemas/Product"
                    },
                    {
                        "type": "object",
                        "properties": {
                            "CartItem": {
                                "$ref": "#/components/schemas/CartItem"
                            },
                        }
                    }
                ]
            },
            "CartResponse": {
                "type": "object",
                "properties": {
                    "cartProducts": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/CartItemResponse"
                        }
                    },
                    "totalAmount": {
                        "type": "number",
                        "example": 100000
                    }
                }
            },
            "AddToCartRequest": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string",
                        "example": "90"
                    }
                },
                "required": ["productId"]
            },
            "AddToCartResponse": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/CartItem"
                        }
                    },
                    "msg": {
                        "type": "string",
                        "example": "Item added to cart"
                    }
                }
            },
            "CartUpdateResponse": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "integer",
                        "example": 1
                    },
                    "msg": {
                        "type": "string",
                        "example": "1Item removed from cart"
                    }
                }
            }
        },
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "description": "JWT authorization header using the Bearer scheme. Enter access token."
            }
        },
    }
}
