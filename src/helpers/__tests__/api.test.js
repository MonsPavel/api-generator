import { expect, it, describe } from 'vitest';
import { getApiPathsKeys, isNotVersionOrPrefix, trimPath, generateApiObject, getDynamicPath } from '../api'

const swagger =  {
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
        const path2 = {
            "/api/v1/call/info/{call_id}": {
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
        }
        const key = '/api/v1/call/count'
        const key2 = '/api/v1/call/info/{call_id}'
        expect(generateApiObject(path, key)).toStrictEqual({"dynamicPath": "", "functionName": "addCallCount", "method": "post","module": "call","path": "/count"})
        expect(generateApiObject(path2, key2)).toStrictEqual({"dynamicPath": "{call_id}", "functionName": "getCallInfo", "method": "get","module": "call","path": "/info/"})
    })
    it('return dynamic path of url', () => {
        const path = '/call/info/{call_id}'
        const path2 = '/call/info/'
        expect(getDynamicPath(path)).toBe('{call_id}')
        expect(getDynamicPath(path2)).toBe('')
    })
})
