const _ = require('lodash');
const request = require('request').defaults({
    //'proxy' : 'http://localhost:8888'
});
const csvGenerator = require('json2csv');
const fs = require('fs');
const fields = ['id', 'date', 'artists', 'location', 'venue'];


let now = new Date();
const filename = `./output/${now.getFullYear()}${(now.getMonth() + 1)}${now.getDay()}${now.getTime()}.csv`;

let getEvents = function (req) {
    request.post(req, handleResponse);
};

let requestData = {
    url: 'http://events.themusic.com.au/admin/php/appsearch.php',
    form: {
        search: 'events',
        page: 1
    }
};

let handleResponse = (err, resp, body) => {

    if (!err && !_.isUndefined(resp)) {
        let eventData = JSON.parse(body);


        if (_.isUndefined(eventData) || _.isUndefined(eventData.events) || eventData.events.length === 0) {
            console.log('no more events');
            return;
        }


        console.log('scraping page: ' + requestData.form.page);
        eventData.events.forEach((e) => {
            var csvOptions = {data: e, fields: fields, hasCSVColumnTitle: false};
            var csv = csvGenerator(csvOptions) + "\r\n";

            fs.appendFile(filename, csv, function (err) {
                if (err) {
                    throw err;
                }
            });
        });

        requestData.form.page = requestData.form.page + 1;
        getEvents(requestData);
    }
};


getEvents(requestData);

