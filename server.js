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
    if(!req.query.name || !req.query.quote) {
        res.writeHead(404, {'ContentType' : 'text/plain'});
        res.end();
        console.log("quote not put")
        console.log(req.query)
        return;
    }
    client.connect(err => {
        const db = client.db("CharlesZhang_M5");
        let quote = {name: req.query.name, quote: req.query.quote};
        db.collection("quotes").insertOne(quote, function(err, result) {
            console.log(req.query);
            if (err) throw err;
            res.writeHead(200, {'ContentType' : 'text/plain'});
            res.write("Success");
            res.end();
            console.log("QUOTE PUT")
            client.close();
        });
    });
});

app.listen(80);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}