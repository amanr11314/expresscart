module.exports = {
    get: {
        tags: ['Auth'],
        description: "Get User details by id",
        operationId: "getUser",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id"
                },
                required: true,
                description: "A user id"
            }
        ],
        security: [
            {
                "BearerAuth": []
            }
        ],
        responses: {
            '200': {
                description: "User details is obtained",
                content: {
                    'application/json': {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "user": {
                                    "$ref": "#/components/schemas/GetUserResponse"
                                }
                            }
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