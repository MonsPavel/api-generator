import { expect, it, describe } from 'vitest';
import { fromCapitalLetter, getPrefix } from '../helpers';

describe('helpers', () => {
    it('should return word with first capital letter', () => {
        expect(fromCapitalLetter('api')).toBe('Api')
        expect(fromCapitalLetter('longwordwithlowercase')).toBe('Longwordwithlowercase')
    })
    it('should return function prefix', () => {
        expect(getPrefix('get')).toBe('get')
        expect(getPrefix('post')).toBe('add')
        expect(getPrefix('patch')).toBe('update')
        expect(getPrefix('delete')).toBe('delete')
        expect(getPrefix('random')).toBe('')
    })
})
