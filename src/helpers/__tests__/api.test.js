import { expect, it, describe } from 'vitest';
import { getApiPathsKeys, isNotVersionOrPrefix, trimPath, generateApiObject } from '../api'

const swagger = {
    "openapi": "3.0.0",
    "info": {
        "title": "NPS Api",
        "description": "\u0412 \u0446\u0435\u043b\u044f\u0445 \u0443\u043b\u0443\u0447\u0448\u0435\u043d\u0438\u044f \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0440\u0430\u0431\u043e\u0442\u044b \u041a\u0426 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u0438\u043b\u0438 \u0440\u0443\u0447\u043d\u043e\u0433\u043e \u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0437\u0430\u0434\u0430\u043d\u0438\u0439 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
        "version": "1.1.0"
    },
    "paths": {
        "\/api\/v1\/call\/count": {
            "post": {
                "tags": [
                    "Call"
                ],
                "summary": "\u041c\u0435\u0442\u043e\u0434 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043a\u043e\u043b-\u0432\u0430 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                "description": "\u041c\u0435\u0442\u043e\u0434 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043a\u043e\u043b-\u0432\u0430 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                "operationId": "post_call_count",
                "requestBody": {
                    "content": {
                        "application\/json": {
                            "schema": {
                                "$ref": "#\/components\/schemas\/FilterContract"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "\u041a\u043e\u043b-\u0432\u043e \u0437\u0430\u0434\u0430\u043d\u0438\u0439 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/CallCountResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            }
        },
        "\/api\/v1\/call\/info\/{call_id}": {
            "get": {
                "tags": [
                    "Call"
                ],
                "summary": "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                "description": "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                "operationId": "get_call_info",
                "parameters": [
                    {
                        "name": "call_id",
                        "in": "path",
                        "description": "ID \u0437\u0430\u0434\u0430\u043d\u0438\u044f \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "description": "\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430"
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "\u041b\u0438\u043c\u0438\u0442 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/CallInfoResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "\u041e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            }
        },
        "\/api\/v1\/communication\/create": {
            "post": {
                "tags": [
                    "Communication"
                ],
                "summary": "\u041c\u0435\u0442\u043e\u0434 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0438\u0441\u0445\u043e\u0434\u044f\u0449\u0435\u0439 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438.",
                "description": "\u041c\u0435\u0442\u043e\u0434 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0438\u0441\u0445\u043e\u0434\u044f\u0449\u0435\u0439 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438.",
                "operationId": "post_communication_create",
                "requestBody": {
                    "content": {
                        "application\/json": {
                            "schema": {
                                "$ref": "#\/components\/schemas\/CommunicationCreateRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/Communication"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            }
        },
        "\/api\/v1\/communication\/delete": {
            "delete": {
                "tags": [
                    "Communication"
                ],
                "operationId": "delete_communication_delete",
                "requestBody": {
                    "content": {
                        "application\/json": {
                            "schema": {
                                "$ref": "#\/components\/schemas\/DeleteRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u0440\u043e\u0448\u043b\u043e \u0443\u0441\u043f\u0435\u0448\u043d\u043e",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/DeleteResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            }
        },
        "\/api\/v1\/dictionary\/order\/status": {
            "get": {
                "tags": [
                    "Dictionary"
                ],
                "operationId": "get_dictionary_order_status",
                "responses": {
                    "200": {
                        "description": "\u0421\u043f\u0438\u0441\u043e\u043a \u0441\u0442\u0430\u0442\u0443\u0441\u043e\u0432 \u0437\u0430\u043a\u0430\u0437\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#\/components\/schemas\/DictionaryPairDto"
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            }
        },
    },
    "components": {
        "schemas": {
            "FilterContract": {
                "properties": {
                    "order": {
                        "$ref": "#\/components\/schemas\/OrderReference"
                    },
                    "return": {
                        "$ref": "#\/components\/schemas\/ReturnReference"
                    },
                    "user": {
                        "$ref": "#\/components\/schemas\/UserReference"
                    },
                    "product": {
                        "$ref": "#\/components\/schemas\/ProductReference"
                    }
                },
                "type": "object"
            },
            "CallCountResponse": {
                "properties": {
                    "message": {
                        "title": "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0430\u043f\u0438.",
                        "type": "string"
                    },
                    "data": {
                        "$ref": "#\/components\/schemas\/CallCountDto"
                    }
                },
                "type": "object"
            },
            "ErrorResponse": {
                "properties": {
                    "message": {
                        "title": "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "string"
                    },
                    "code": {
                        "title": "\u041a\u043e\u0434 \u043e\u0448\u0438\u0431\u043a\u0438",
                        "type": "integer"
                    },
                    "data": {
                        "$ref": "#\/components\/schemas\/ErrorDto"
                    }
                },
                "type": "object"
            },
            "UnauthorizedResponse": {
                "properties": {
                    "message": {
                        "title": "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "string"
                    },
                    "data": {
                        "$ref": "#\/components\/schemas\/UnauthorizedErrorDto"
                    }
                },
                "type": "object"
            },
            "ForbiddenResponse": {
                "properties": {
                    "message": {
                        "title": "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "string"
                    },
                    "data": {
                        "$ref": "#\/components\/schemas\/ForbiddenErrorDto"
                    }
                },
                "type": "object"
            },
            "DeleteRequest": {
                "required": [
                    "ids"
                ],
                "properties": {
                    "ids": {
                        "description": "\u041c\u0430\u0441\u0441\u0438\u0432 \u0443\u0434\u0430\u043b\u0435\u043d\u043d\u044b\u0445 ID.",
                        "type": "array",
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "type": "object"
            },
            "DeleteResponse": {
                "properties": {
                    "ids": {
                        "description": "\u041c\u0430\u0441\u0441\u0438\u0432 \u0443\u0434\u0430\u043b\u0435\u043d\u043d\u044b\u0445 ID.",
                        "type": "array",
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "type": "object"
            },
            "CallInfoResponse": {
                "properties": {
                    "callId": {
                        "type": "integer"
                    },
                    "callStatus": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/CallStatus"
                            }
                        ]
                    },
                    "callDate": {
                        "type": "string"
                    },
                    "callComment": {
                        "type": "string",
                        "nullable": true
                    },
                    "operator": {
                        "type": "string",
                        "nullable": true
                    },
                    "user": {
                        "$ref": "#\/components\/schemas\/UserModel"
                    },
                    "order": {
                        "$ref": "#\/components\/schemas\/OrderModel"
                    },
                    "userCardUrl": {
                        "type": "string"
                    },
                    "orderCardUrl": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "CallListResponse": {
                "properties": {
                    "communicationId": {
                        "title": "Id \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "communicationName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "string"
                    },
                    "communicationStatus": {
                        "title": "\u0421\u0442\u0430\u0442\u0443\u0441 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "string"
                    },
                    "page": {
                        "title": "\u041d\u043e\u043c\u0435\u0440 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b",
                        "type": "integer"
                    },
                    "limit": {
                        "title": "\u041b\u0438\u043c\u0438\u0442 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432",
                        "type": "integer"
                    },
                    "total": {
                        "title": "\u0412\u0441\u0435\u0433\u043e \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432",
                        "type": "integer"
                    },
                    "message": {
                        "title": "\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u0430",
                        "type": "string"
                    },
                    "data": {
                        "type": "array",
                        "items": {
                            "$ref": "#\/components\/schemas\/CallModel"
                        }
                    },
                    "finished_calls": {
                        "title": "\u041a\u043e\u043b-\u0432\u043e \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0445 \u0437\u0432\u043e\u043d\u043a\u043e\u0432",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "CallStatus": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "callStatusName": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "CallUpdateRequest": {
                "required": [
                    "call_id"
                ],
                "properties": {
                    "call_id": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f",
                        "type": "integer"
                    },
                    "operator_id": {
                        "title": "ID \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "integer",
                        "nullable": true
                    },
                    "status_id": {
                        "title": "ID \u0441\u0442\u0430\u0442\u0443\u0441\u0430",
                        "type": "integer",
                        "nullable": true
                    },
                    "comments": {
                        "title": "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438",
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "Call": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "communication": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/Communication"
                            }
                        ]
                    },
                    "orderId": {
                        "type": "integer"
                    },
                    "operator": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/User"
                            }
                        ]
                    },
                    "userId": {
                        "type": "integer"
                    },
                    "callStatus": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/CallStatus"
                            }
                        ]
                    },
                    "comments": {
                        "type": "string",
                        "nullable": true
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time"
                    }
                },
                "type": "object"
            },
            "CommunicationCreateRequest": {
                "required": [
                    "communicationName",
                    "filters",
                    "communicationTypeId"
                ],
                "properties": {
                    "communicationName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",
                        "type": "string",
                        "nullable": true
                    },
                    "filters": {
                        "title": "\u0424\u0438\u043b\u044c\u0442\u0440",
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/FilterContract"
                            }
                        ]
                    },
                    "communicationTypeId": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u0442\u0438\u043f\u0430 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "operatorId": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "Communication": {
                "required": [
                    "communicationName",
                    "communicationStatus",
                    "communicationType"
                ],
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "communicationName": {
                        "type": "string"
                    },
                    "createdAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "communicationStatus": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/CommunicationStatus"
                            }
                        ]
                    },
                    "communicationType": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/CommunicationType"
                            }
                        ]
                    },
                    "filters": {
                        "$ref": "#\/components\/schemas\/FilterContract"
                    }
                },
                "type": "object"
            },
            "CommunicationFiltersResponse": {
                "properties": {
                    "count": {
                        "description": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439",
                        "type": "integer"
                    },
                    "newCount": {
                        "description": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043d\u043e\u0432\u044b\u0445 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439",
                        "type": "integer"
                    },
                    "inWorkCount": {
                        "description": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439 \u0432 \u0440\u0430\u0431\u043e\u0442\u0435",
                        "type": "integer"
                    },
                    "userCount": {
                        "description": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0439 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u0445 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044e",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "CommunicationListResponse": {
                "properties": {
                    "data": {
                        "title": "\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "array",
                        "items": {
                            "$ref": "#\/components\/schemas\/CommunicationModel"
                        }
                    },
                    "page": {
                        "title": "\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430",
                        "type": "integer"
                    },
                    "limit": {
                        "title": "\u041b\u0438\u043c\u0438\u0442 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432",
                        "type": "integer"
                    },
                    "total": {
                        "title": "\u0412\u0441\u0435\u0433\u043e \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432",
                        "type": "integer"
                    },
                    "message": {
                        "title": "\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u0430",
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "CommunicationSetOperatorRequest": {
                "required": [
                    "operator_id",
                    "communication_id"
                ],
                "properties": {
                    "operator_id": {
                        "title": "ID \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "integer",
                        "nullable": true
                    },
                    "communication_id": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "CommunicationStatus": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "communicationStatusName": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "CommunicationType": {
                "properties": {
                    "communicationTypeName": {
                        "type": "string"
                    },
                    "robot": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/Robot"
                            }
                        ]
                    },
                    "robotData": {
                        "title": "\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u043e \u0440\u043e\u0431\u043e\u0442\u0443",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "id": {
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "CommunicationUpdateRequest": {
                "required": [
                    "communicationName"
                ],
                "properties": {
                    "communicationId": {
                        "title": "ID \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/Communication"
                            }
                        ]
                    },
                    "communicationName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",
                        "type": "string",
                        "nullable": true
                    },
                    "communicationStatusId": {
                        "title": "\u0421\u0442\u0430\u0442\u0443\u0441 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer",
                        "nullable": true
                    },
                    "operatorId": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "integer",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "DictionaryPairDto": {
                "properties": {
                    "id": {
                        "type": ""
                    },
                    "title": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "Robot": {
                "properties": {
                    "robotName": {
                        "type": "string"
                    },
                    "id": {
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "TemplateCreateRequest": {
                "required": [
                    "templateName",
                    "templateTypeId",
                    "communicationTypeId",
                    "filters"
                ],
                "properties": {
                    "templateName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "nullable": true
                    },
                    "templateTypeId": {
                        "title": "\u0422\u0438\u043f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "integer"
                    },
                    "communicationTypeId": {
                        "title": "\u0422\u0438\u043f \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "templateSchedulerId": {
                        "title": "\u0422\u0438\u043f \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "integer"
                    },
                    "startedAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u043d\u0430\u0447\u0430\u043b\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "finishedAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "filters": {
                        "title": "\u0424\u0438\u043b\u044c\u0442\u0440",
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/FilterContract"
                            }
                        ]
                    }
                },
                "type": "object"
            },
            "Template": {
                "required": [
                    "templateType",
                    "communicationType"
                ],
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "templateName": {
                        "type": "string"
                    },
                    "startedAt": {
                        "title": "\u0417\u0430\u043f\u0443\u0441\u043a \u0448\u0430\u0431\u043b\u043e\u043d\u0430 c",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "finishedAt": {
                        "title": "\u0417\u0430\u043f\u0443\u0441\u043a \u0448\u0430\u0431\u043b\u043e\u043d\u0430 \u043f\u043e",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "templateType": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/TemplateType"
                            }
                        ]
                    },
                    "communicationType": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/CommunicationType"
                            }
                        ]
                    },
                    "templateScheduler": {
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/TemplateScheduler"
                            }
                        ]
                    },
                    "createdAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "filters": {
                        "$ref": "#\/components\/schemas\/FilterContract"
                    }
                },
                "type": "object"
            },
            "TemplateFilterContractResponse": {
                "properties": {
                    "message": {
                        "description": "\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0430\u043f\u0438.",
                        "type": "string"
                    },
                    "data": {
                        "$ref": "#\/components\/schemas\/FilterContract"
                    }
                },
                "type": "object"
            },
            "TemplateModel": {
                "properties": {
                    "id": {
                        "title": "Id \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "integer"
                    },
                    "templateName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string"
                    },
                    "startedAt": {
                        "title": "\u0417\u0430\u043f\u0443\u0441\u043a \u0448\u0430\u0431\u043b\u043e\u043d\u0430 c",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "finishedAt": {
                        "title": "\u0417\u0430\u043f\u0443\u0441\u043a \u0448\u0430\u0431\u043b\u043e\u043d\u0430 \u043f\u043e",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "templateType": {
                        "$ref": "#\/components\/schemas\/TemplateType"
                    },
                    "communicationType": {
                        "$ref": "#\/components\/schemas\/CommunicationType"
                    },
                    "templateScheduler": {
                        "title": "\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435",
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/TemplateScheduler"
                            }
                        ]
                    },
                    "filters": {
                        "$ref": "#\/components\/schemas\/FilterContract"
                    }
                },
                "type": "object"
            },
            "TemplateType": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "templateTypeName": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "TemplateUpdateRequest": {
                "required": [
                    "templateId",
                    "templateName",
                    "templateTypeId",
                    "communicationTypeId",
                    "filters"
                ],
                "properties": {
                    "templateId": {
                        "title": "Id \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "integer"
                    },
                    "templateName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "nullable": true
                    },
                    "templateTypeId": {
                        "title": "\u0422\u0438\u043f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "integer"
                    },
                    "communicationTypeId": {
                        "title": "\u0422\u0438\u043f \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "templateSchedulerId": {
                        "title": "Id \u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "integer"
                    },
                    "startedAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u043d\u0430\u0447\u0430\u043b\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "finishedAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0448\u0430\u0431\u043b\u043e\u043d\u0430",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "filters": {
                        "title": "\u0424\u0438\u043b\u044c\u0442\u0440",
                        "nullable": true,
                        "allOf": [
                            {
                                "$ref": "#\/components\/schemas\/FilterContract"
                            }
                        ]
                    }
                },
                "type": "object"
            },
            "TemplateSchedulerCreateRequest": {
                "required": [
                    "schedulerName",
                    "expression",
                    "startedAt"
                ],
                "properties": {
                    "schedulerName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "string",
                        "nullable": true
                    },
                    "expression": {
                        "title": "\u041f\u0440\u0430\u0432\u0438\u043b\u043e cron",
                        "type": "string"
                    },
                    "startedAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u043d\u0430\u0447\u0430\u043b\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    }
                },
                "type": "object"
            },
            "TemplateScheduler": {
                "properties": {
                    "schedulerName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "string"
                    },
                    "expression": {
                        "title": "\u041f\u0440\u0430\u0432\u0438\u043b\u043e cron",
                        "type": "string"
                    },
                    "startedAt": {
                        "type": "string",
                        "format": "date-time",
                        "example": "Y-m-d\\TH:i:sP"
                    },
                    "id": {
                        "title": "Id \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "User": {
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "lastName": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "active": {
                        "type": "boolean"
                    },
                    "token": {
                        "type": "string",
                        "nullable": true
                    },
                    "roles": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "password": {
                        "type": "string"
                    },
                    "userIdentifier": {
                        "title": "A visual identifier that represents this user.",
                        "type": "string"
                    },
                    "fullName": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "OrderReference": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "params": {
                        "$ref": "#\/components\/schemas\/OrderParams"
                    }
                },
                "type": "object"
            },
            "ReturnReference": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "params": {
                        "$ref": "#\/components\/schemas\/ReturnParams"
                    }
                },
                "type": "object"
            },
            "UserReference": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "params": {
                        "$ref": "#\/components\/schemas\/UserParams"
                    }
                },
                "type": "object"
            },
            "ProductReference": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "params": {
                        "$ref": "#\/components\/schemas\/ProductParams"
                    }
                },
                "type": "object"
            },
            "CallCountDto": {
                "properties": {
                    "count": {
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "ErrorDto": {
                "properties": {
                    "errors": {
                        "title": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "trace": {
                        "title": "\u0421\u0442\u0435\u043a\u0442\u0440\u0435\u0439\u0441 \u0438\u0441\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f",
                        "type": "string"
                    },
                    "context": {
                        "title": "\u041a\u043e\u043d\u0442\u0435\u043a\u0441\u0442 \u043e\u0448\u0438\u0431\u043a\u0438",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "type": "object"
            },
            "UnauthorizedErrorDto": {
                "properties": {
                    "errors": {
                        "title": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "url": {
                        "title": "\u0410\u0434\u0440\u0435\u0441 \u0434\u043b\u044f \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "ForbiddenErrorDto": {
                "properties": {
                    "errors": {
                        "title": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0448\u0438\u0431\u043a\u0435",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "token": {
                        "title": "\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044b\u0439 \u0442\u043e\u043a\u0435\u043d \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "UserModel": {
                "properties": {
                    "id": {
                        "title": "ID \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f.",
                        "type": "integer"
                    },
                    "fullName": {
                        "title": "\u0424\u0418\u041e.",
                        "type": "string"
                    },
                    "phone": {
                        "title": "\u0422\u0435\u043b\u0435\u0444\u043e\u043d.",
                        "type": "string"
                    },
                    "orderCount": {
                        "title": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0437\u0430\u043a\u0430\u0437\u043e\u0432.",
                        "type": "integer"
                    },
                    "clientStatus": {
                        "title": "\u041c\u0435\u0442\u043a\u0438 \u043a\u043b\u0438\u0435\u043d\u0442\u0430",
                        "type": "array",
                        "items": {
                            "type": "integer"
                        }
                    },
                    "callCount": {
                        "title": "\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0439.",
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "OrderModel": {
                "properties": {
                    "id": {
                        "title": "ID \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "integer"
                    },
                    "account_number": {
                        "title": "\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "string"
                    },
                    "status": {
                        "title": "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "string"
                    },
                    "statusCode": {
                        "title": "\u0421\u0438\u043c\u0432\u043e\u043b\u044c\u043d\u044b\u0439 ID \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "string"
                    },
                    "address": {
                        "title": "\u0410\u0434\u0440\u0435\u0441 \u0422\u041e.",
                        "type": "string"
                    },
                    "siteName": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0430.",
                        "type": "string"
                    },
                    "storeFormat": {
                        "title": "Store Format.",
                        "type": "string"
                    },
                    "user_id": {
                        "title": "ID \u043a\u043b\u0438\u0435\u043d\u0442\u0430.",
                        "type": "integer"
                    },
                    "orderFio": {
                        "title": "\u0424\u0418\u041e \u0432 \u0437\u0430\u043a\u0430\u0437\u0435.",
                        "type": "string"
                    },
                    "orderPhone": {
                        "title": "\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0432 \u0437\u0430\u043a\u0430\u0437\u0435.",
                        "type": "string"
                    },
                    "createdAt": {
                        "title": "\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "string"
                    },
                    "products": {
                        "title": "\u0421\u043e\u0441\u0442\u0430\u0432 \u0437\u0430\u043a\u0430\u0437\u0430.",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    }
                },
                "type": "object"
            },
            "CallModel": {
                "properties": {
                    "index": {
                        "title": "\u041f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f \u0432 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "id": {
                        "title": "ID \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f",
                        "type": "integer"
                    },
                    "userPhone": {
                        "title": "\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u0437\u0430\u044f\u0432\u0438\u0442\u0435\u043b\u044f",
                        "type": "string",
                        "nullable": true
                    },
                    "userFio": {
                        "title": "\u0424\u0418\u041e \u0437\u0430\u044f\u0432\u0438\u0442\u0435\u043b\u044f",
                        "type": "string",
                        "nullable": true
                    },
                    "orderId": {
                        "title": "ID \u0437\u0430\u043a\u0430\u0437\u0430",
                        "type": "integer"
                    },
                    "orderStatus": {
                        "title": "\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430",
                        "type": "string"
                    },
                    "callStatus": {
                        "title": "\u0421\u0442\u0430\u0442\u0443\u0441 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f",
                        "type": "string"
                    },
                    "operator": {
                        "title": "\u0418\u043c\u044f \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "CommunicationModel": {
                "properties": {
                    "finished_calls": {
                        "title": "\u041a\u043e\u043b-\u0432\u043e \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u044b\u0445 \u0437\u0432\u043e\u043d\u043a\u043e\u0432",
                        "type": "integer"
                    },
                    "id": {
                        "title": "\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438",
                        "type": "integer"
                    },
                    "name": {
                        "title": "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",
                        "type": "string"
                    },
                    "created_at": {
                        "title": "\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0437\u0430\u0434\u0430\u0447\u0438",
                        "type": "string"
                    },
                    "total_calls": {
                        "title": "\u041e\u0431\u0449\u0435\u0435 \u043a\u043e\u043b-\u043b\u043e \u0437\u0432\u043e\u043d\u043a\u043e\u0432",
                        "type": "integer"
                    },
                    "received_calls": {
                        "title": "\u041a\u043e\u043b-\u0432\u043e \u043f\u0440\u0438\u043d\u044f\u0442\u044b\u0445 \u0437\u0432\u043e\u043d\u043a\u043e\u0432",
                        "type": "integer"
                    },
                    "not_received_calls": {
                        "title": "\u041a\u043e\u043b-\u0432\u043e \u043d\u0435\u043f\u0440\u0438\u043d\u044f\u0442\u044b\u0445 \u0437\u0432\u043e\u043d\u043a\u043e\u0432",
                        "type": "integer"
                    },
                    "progress": {
                        "title": "\u041f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0432 \u043f\u0440\u043e\u0446\u0435\u043d\u0442\u0430\u0445: \u041e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0435 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043d\u044b\u0445 \u0437\u0432\u043e\u043d\u043a\u043e\u0432 \u043a \u043e\u0431\u0449\u0435\u043c\u0443 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0443",
                        "type": "integer"
                    },
                    "status": {
                        "$ref": "#\/components\/schemas\/CommunicationStatus"
                    },
                    "communicationType": {
                        "$ref": "#\/components\/schemas\/CommunicationType"
                    },
                    "operator": {
                        "title": "\u0424\u0438\u043e \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430",
                        "type": "string",
                        "nullable": true
                    },
                    "filters": {
                        "$ref": "#\/components\/schemas\/FilterContract"
                    }
                },
                "type": "object"
            },
            "OrderParams": {
                "properties": {
                    "id": {
                        "$ref": "#\/components\/schemas\/IdParam"
                    },
                    "ordinalNumber": {
                        "$ref": "#\/components\/schemas\/OrdinalNumberParam"
                    },
                    "storeFormatOrdinalNumber": {
                        "$ref": "#\/components\/schemas\/StoreFormatOrdinalNumberParam"
                    },
                    "date": {
                        "$ref": "#\/components\/schemas\/DateParam"
                    },
                    "status": {
                        "$ref": "#\/components\/schemas\/StatusParam"
                    },
                    "paymentStatus": {
                        "$ref": "#\/components\/schemas\/PaymentStatusParam"
                    }
                },
                "type": "object"
            },
            "ReturnParams": {
                "properties": {
                    "id": {
                        "$ref": "#\/components\/schemas\/IdParam2"
                    },
                    "date": {
                        "$ref": "#\/components\/schemas\/DateParam2"
                    },
                    "status": {
                        "$ref": "#\/components\/schemas\/StatusParam2"
                    }
                },
                "type": "object"
            },
            "UserParams": {
                "properties": {
                    "clientStatus": {
                        "$ref": "#\/components\/schemas\/ClientStatusParam"
                    }
                },
                "type": "object"
            },
            "ProductParams": {
                "properties": {
                    "xmlId": {
                        "$ref": "#\/components\/schemas\/XmlIdParam"
                    },
                    "name": {
                        "$ref": "#\/components\/schemas\/NameParam"
                    }
                },
                "type": "object"
            },
            "IdParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/IdConditions"
                    }
                },
                "type": "object"
            },
            "OrdinalNumberParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/OrdinalNumberConditions"
                    }
                },
                "type": "object"
            },
            "StoreFormatOrdinalNumberParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/StoreFormatOrdinalNumberConditions"
                    }
                },
                "type": "object"
            },
            "DateParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/DateConditions"
                    }
                },
                "type": "object"
            },
            "StatusParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/StatusConditions"
                    }
                },
                "type": "object"
            },
            "PaymentStatusParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/PaymentStatusConditions"
                    }
                },
                "type": "object"
            },
            "IdParam2": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/IdConditions2"
                    }
                },
                "type": "object"
            },
            "DateParam2": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/DateConditions2"
                    }
                },
                "type": "object"
            },
            "StatusParam2": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/StatusConditions2"
                    }
                },
                "type": "object"
            },
            "ClientStatusParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/ClientStatusConditions"
                    }
                },
                "type": "object"
            },
            "XmlIdParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/XmlIdConditions"
                    }
                },
                "type": "object"
            },
            "NameParam": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "conditions": {
                        "$ref": "#\/components\/schemas\/NameConditions"
                    }
                },
                "type": "object"
            },
            "IdConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntCondition"
                    }
                },
                "type": "object"
            },
            "OrdinalNumberConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntCondition"
                    }
                },
                "type": "object"
            },
            "StoreFormatOrdinalNumberConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntCondition"
                    }
                },
                "type": "object"
            },
            "DateConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualStringCondition"
                    },
                    "greater": {
                        "$ref": "#\/components\/schemas\/GreaterCondition"
                    },
                    "less": {
                        "$ref": "#\/components\/schemas\/LessCondition"
                    },
                    "period": {
                        "$ref": "#\/components\/schemas\/PeriodCondition"
                    }
                },
                "type": "object"
            },
            "StatusConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualStringDictionaryCondition"
                    }
                },
                "type": "object"
            },
            "PaymentStatusConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualStringDictionaryCondition"
                    }
                },
                "type": "object"
            },
            "IdConditions2": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntCondition"
                    }
                },
                "type": "object"
            },
            "DateConditions2": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualStringCondition"
                    },
                    "greater": {
                        "$ref": "#\/components\/schemas\/GreaterCondition"
                    },
                    "less": {
                        "$ref": "#\/components\/schemas\/LessCondition"
                    },
                    "period": {
                        "$ref": "#\/components\/schemas\/PeriodCondition"
                    }
                },
                "type": "object"
            },
            "StatusConditions2": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntDictionaryCondition"
                    }
                },
                "type": "object"
            },
            "ClientStatusConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntDictionaryCondition"
                    }
                },
                "type": "object"
            },
            "XmlIdConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualIntCondition"
                    }
                },
                "type": "object"
            },
            "NameConditions": {
                "properties": {
                    "equal": {
                        "$ref": "#\/components\/schemas\/EqualStringCondition"
                    },
                    "like": {
                        "$ref": "#\/components\/schemas\/LikeCondition"
                    },
                    "starts": {
                        "$ref": "#\/components\/schemas\/StartsCondition"
                    }
                },
                "type": "object"
            },
            "EqualIntCondition": {
                "properties": {
                    "value": {
                        "type": "integer",
                        "nullable": true
                    },
                    "type": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "EqualStringCondition": {
                "properties": {
                    "value": {
                        "type": "string",
                        "nullable": true
                    },
                    "type": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "GreaterCondition": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "LessCondition": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "PeriodCondition": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "$ref": "#\/components\/schemas\/PeriodValues"
                    }
                },
                "type": "object"
            },
            "EqualStringDictionaryCondition": {
                "properties": {
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    },
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "EqualIntDictionaryCondition": {
                "properties": {
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "integer",
                        "nullable": true
                    },
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "LikeCondition": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "StartsCondition": {
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            },
            "PeriodValues": {
                "properties": {
                    "from": {
                        "type": "string",
                        "nullable": true
                    },
                    "to": {
                        "type": "string",
                        "nullable": true
                    }
                },
                "type": "object"
            }
        },
        "securitySchemes": {
            "Bearer": {
                "type": "http",
                "bearerFormat": "JWT",
                "scheme": "bearer"
            }
        }
    }
}


describe('api-generator', () => {
    it('should return paths keys', () => {
        expect(getApiPathsKeys(swagger).length).toBe(5)
    })
    it('return true if not prefix or version', () => {
        expect(isNotVersionOrPrefix('v2')).toBe(false)
        expect(isNotVersionOrPrefix('api')).toBe(false)
        expect(isNotVersionOrPrefix('swagger')).toBe(true)
    })
    it('return path without version and prefix', () => {
        expect(trimPath('/api/v1/call/count')).toBe('/call/count')
    })
    it('return api object', () => {
        const path = {
            "/api/v1/call/count": {
                "post": {
                    "tags": [
                        "Call"
                    ],
                    "summary": "\u041c\u0435\u0442\u043e\u0434 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043a\u043e\u043b-\u0432\u0430 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                    "description": "\u041c\u0435\u0442\u043e\u0434 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043a\u043e\u043b-\u0432\u0430 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d.",
                    "operationId": "post_call_count",
                    "requestBody": {
                        "content": {
                            "application\/json": {
                                "schema": {
                                    "$ref": "#\/components\/schemas\/FilterContract"
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "\u041a\u043e\u043b-\u0432\u043e \u0437\u0430\u0434\u0430\u043d\u0438\u0439 \u043d\u0430 \u043e\u0431\u0437\u0432\u043e\u043d",
                            "content": {
                                "application\/json": {
                                    "schema": {
                                        "$ref": "#\/components\/schemas\/CallCountResponse"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u0430",
                            "content": {
                                "application\/json": {
                                    "schema": {
                                        "$ref": "#\/components\/schemas\/ErrorResponse"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                            "content": {
                                "application\/json": {
                                    "schema": {
                                        "$ref": "#\/components\/schemas\/UnauthorizedResponse"
                                    }
                                }
                            }
                        },
                        "403": {
                            "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438",
                            "content": {
                                "application\/json": {
                                    "schema": {
                                        "$ref": "#\/components\/schemas\/ForbiddenResponse"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
                            "content": {
                                "application\/json": {
                                    "schema": {
                                        "$ref": "#\/components\/schemas\/ErrorResponse"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "Bearer": []
                        }
                    ]
                }
            }
        }
        const key = '/api/v1/call/count'
        expect(generateApiObject(path, key)).toStrictEqual({"method": "post","module": "call","path": "/call/count"})
    })
})
