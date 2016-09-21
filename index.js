const request = require('request').defaults({
    'proxy' : 'http://localhost:8888'
});
const _ = require('lodash');
const csv = require('csv');
var stringifier = csv.stringify();

let getEvents = function(req){
    request.post(req, handleResponse);
};

let requestData = {
    url : 'http://events.themusic.com.au/admin/php/appsearch.php',
    form : {
        search : 'events',
        page: 242
    }
};

let handleResponse = (err, resp, body) => {

    if(!err && !_.isUndefined(resp)){
        let eventData = JSON.parse(body);
        if(eventData.events.length === 0){
            return;
        }


        console.log('scraping page: ' + requestData.form.page);
        eventData.events.forEach((e) => {

            // Todo generate each record to a csv

        });

        requestData.form.page = requestData.form.page + 1;
        getEvents(requestData);
    }
};


getEvents(requestData);

