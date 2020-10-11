const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    res.writeHead(200, {'ContentType' : 'text/plain'});
    res.write(Date());
    res.end();
})

app.listen(8080);
