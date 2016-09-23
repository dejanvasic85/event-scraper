const chai = require('chai');
const expect = chai.expect;
const csv = require('csv-generate');

describe('csv', function () {
    it('does something', function () {
        csv({hello: 'world'}, function (err, output) {
            console.log(output);
        });
        console.log('hwat');
    });
});