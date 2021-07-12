import https from 'https';
import express from 'express';

let httpsAgent = new https.Agent({rejectUnauthorized: false});

const app = express();
const hostname = process.env.NODE_IP;
const port = 1080;

app.get('/pastry', (req, res) => {
    const path = "/pastry";
    let result = '';
    console.log('Making API request now');
    https.get({ hostname, path, port, agent: httpsAgent },
        (response) => {
            response.on("data", (chunk) => { result += chunk; });
            response.on("end", () => { console.log(`https success: ${result}`); res.send(result); });
        })
        .on("error", (error) => { console.log(`https error: ${error}`); res.send(`Error: ${error}`); });
})

app.get('/pastry/:name', (req, res) => {
    const path = '/pastry/' + req.params["name"];
    console.log(`Path is ${path}`);
    const uri = encodeURIComponent(path);
    console.log(`URI is ${uri}`);
    let result = '';
    console.log('Making API request now');
    https.get({ hostname, uri, port, agent: httpsAgent },
        (response) => {
            response.on("data", (chunk) => { result += chunk; });
            response.on("end", () => { console.log(`https success: ${result}`); res.send(result); });
        })
        .on("error", (error) => { console.log(`https error: ${error}`); res.send(`Error: ${error}`); });
})

app.listen(443, '0.0.0.0')
