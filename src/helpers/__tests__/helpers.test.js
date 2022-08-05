import { expect, it, describe } from 'vitest';
import {fromCapitalLetter} from "../helpers";

describe('helpers', () => {
    it('should return word with first capital letter', () => {
        expect(fromCapitalLetter('api')).toBe('Api')
        expect(fromCapitalLetter('longwordwithlowercase')).toBe('Longwordwithlowercase')
    })
})
