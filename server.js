const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://db-admin:vQvccC17ncVO79U0@cluster0.kt67l.azure.mongodb.net/CharlesZhang_M5?retryWrites=true&w=majority";


app.get('/time', (req, res) => {
    res.writeHead(200, {'ContentType' : 'text/plain'});
    res.write(Date());
    res.end();
})

app.get('/quote', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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