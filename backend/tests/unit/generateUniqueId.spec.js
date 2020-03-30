const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('It should generate an unique ID', () => {
        const id = generateUniqueId();
        expect(id.length).toBe(8);
    })
})