const expect = require('chai').expect;
const csv = require('json2csv');


describe('csv-creator', () => {
    it('csv to work', () => {

        let fields = ['id', 'location', 'venue', 'artists', 'ticket_url', 'date'];
        let data = [{
            id: '123',
            location: '1 melbourne road',
            venue: 'Melbourne',
            artist: 'the monkees',
            ticket_url: 'http://tickets.com',
            date: '20-SEP-2014'
        }];

        var params = {data: data, fields: fields};
        let results = csv(params);
        console.log(results);
    });
});