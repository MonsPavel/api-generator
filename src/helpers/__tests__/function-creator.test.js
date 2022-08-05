import { expect, it, describe } from 'vitest';
import { createGetFunction } from '../functions-creator'

describe('function-generator', () => {
    it('should return get function code', () => {
        const apiObj = {
            "dynamicPath": "{call_id}", "functionName": "getcall", "method": "get","module": "call","path": "/call/info/"
        }
        // expect(createGetFunction(apiObj)).toBe('')
    })
})
