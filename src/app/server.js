import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const hostname = process.env.NODE_IP;
const port = 1080;

// Workaround only for mock purposes. Should not be used in real life scenario.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/pastry', (req, res) => {
    const path = "/pastry";

    const options = {
        hostname: hostname,
        port: port,
        path: path,
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    };

    makeAPIRequest(options, '', res);
})

app.get('/pastry/:name', (req, res) => {
    const path = encodeURIComponent(req.params.name);
    console.log(`Encoded Path is ${path}`);
    const uri = `/pastry/${path}`;
    console.log(`URI is ${uri}`);

    const options = {
        hostname: hostname,
        port: port,
        path: uri,
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    };

    makeAPIRequest(options, '', res);
})

app.patch('/pastry/:name', (req, res, next) => {
    const path = encodeURIComponent(req.params.name);
    console.log(`Encoded Path is ${path}`);
    const uri = `/pastry/${path}`;
    console.log(`URI is ${uri}`);
    const changes = JSON.stringify(req.body);

    const options = {
        hostname: hostname,
        port: port,
        path: uri,
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        }
    };

    makeAPIRequest(options, changes, res);
})

app.listen(443, '0.0.0.0')

function makeAPIRequest(options, requestBody, res) {
    const request = https.request(options, response => {
        let data = '';

        console.log('Status: ', response.statusCode);
        console.log('Headers: ', JSON.stringify(response.headers));

        response.setEncoding('utf8');

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            const jsonData = JSON.parse(data);
            console.log(`HTTPS success: ${jsonData}`);
            res.send(jsonData);
        });

    }).on('error', e => {
        console.error(`HTTPS error: ${e}`);
    });

    if (requestBody !== '') {
        request.write(requestBody);
    }
    request.end();
}
