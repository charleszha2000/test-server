const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27018';

app.get('/time', (req, res) => {
    res.writeHead(200, {'ContentType' : 'text/plain'});
    res.write(Date());
    res.end();
})

app.get('/quote', (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const db = client.db("CharlesZhang_M5");
        db.collection("quotes").find({}).toArray(function(err, result) {
            if (err) throw err;
            let quote = result[getRandomInt(result.length)]; 
            res.writeHead(200, {'ContentType' : 'text/plain'});
            res.write(quote.quote);
            res.write(" " + "-" + quote.name);
            res.end();
            client.close();
        });
    });
});

app.put('/quote', (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    req.query
    client.connect(err => {
        const db = client.db("CharlesZhang_M5");
        db.collection("quotes").find({}).toArray(function(err, result) {
            if (err) throw err;
            let quote = result[getRandomInt(result.length)]; 
            res.writeHead(200, {'ContentType' : 'text/plain'});
            res.write(quote.quote);
            res.write(" " + "-" + quote.name);
            res.end();
            client.close();
        });
    });
});

app.listen(80);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}