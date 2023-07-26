
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
            "SuccessNoContent": {
                "type": "object",
                "properties": {
                    "msg": {
                        "type": "string"
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
