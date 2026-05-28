const { generatePassword } = require('../passwordGenerator');

describe('generatePassword', () => {
    test('returns a password with the requested length', () => {
        const password = generatePassword(12, true, false, false);
        expect(password).toHaveLength(12);
    });

    test('uses lowercase characters when lowercase is selected', () => {
        const password = generatePassword(20, true, false, false);
        expect(password).toMatch(/^[a-z]+$/);
    });

    test('uses uppercase characters when uppercase is selected', () => {
        const password = generatePassword(20, false, true, false);
        expect(password).toMatch(/^[A-Z]+$/);
    });

    test('uses numeric characters when numbers is selected', () => {
        const password = generatePassword(20, false, false, true);
        expect(password).toMatch(/^[0-9]+$/);
    });

    test('uses only selected character sets for mixed options', () => {
        const password = generatePassword(40, false, true, true);
        expect(password).toMatch(/^[A-Z0-9]+$/);
    });

    test('returns an empty string when length is zero', () => {
        const password = generatePassword(0, true, false, false);
        expect(password).toBe('');
    });
});