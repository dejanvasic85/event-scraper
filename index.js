const _ = require('lodash');
const request = require('request').defaults({
    //'proxy' : 'http://localhost:8888'
});





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



            console.log(e);
            // Todo generate each record to a csv

        });

        /*requestData.form.page = requestData.form.page + 1;
        getEvents(requestData);*/
    }
};


getEvents(requestData);

