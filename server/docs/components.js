
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
                },
                "required": [
                    "id",
                    "quantity",
                    "createdAt",
                    "updatedAt",
                    "CartId",
                    "ProductId"
                ]
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
                },
                "required": ["data", "msg"]
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
            },
            "BulkAddToCartRequest": {
                "type": "object",
                "properties": {
                    "productIds": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                }
            },
            "BulkAddToCartResponse": {
                "type": "object",
                "properties": {
                    "updatedCartProducts": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/CartItemResponse"
                        }
                    },
                    "count": {
                        "type": "number",
                        "example": 2
                    },
                    "status": {
                        "type": "string",
                        "example": "Added 2 items to cart"
                    }
                }
            },
            "SignInRequest": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "password": {
                        "type": "string"
                    }
                },
                "required": ["email", "password"]
            },
            "SignInResponse": {
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string",
                        "description": "Access token for authenticated user."
                    },
                    "refreshToken": {
                        "type": "string",
                        "description": "Refresh token for authenticated user."
                    },
                    "expiresIn": {
                        "type": "integer",
                        "description": "Token expiration time in seconds."
                    },
                    "id": {
                        "type": "string",
                        "description": "User ID."
                    }
                },
                "required": ["token", "refreshToken", "expiresIn", "id"]
            },
            "SignUpRequest": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "password": {
                        "type": "string"
                    }
                },
                "required": ["name", "email", "password"]
            },
            "User": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the user."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the user."
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "The email of the user."
                    },
                    "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The date and time when the user was last updated."
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The date and time when the user was created."
                    }
                },
                "required": ["id", "name", "email", "updatedAt", "createdAt"]
            },
            "SignUpResponse": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "A message indicating the success of the user creation."
                    },
                    "result": {
                        "$ref": "#/components/schemas/User"
                    }
                }
            },
            "GetUserResponse": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "A message indicating the success of the user creation."
                    },
                    "status": {
                        "type": "number",
                        "description": "status code"
                    },
                    "data": {
                        "$ref": "#/components/schemas/User"
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
