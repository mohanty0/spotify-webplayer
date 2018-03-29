const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

//middle - vares 
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, 'dist/static')))
	.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

require('./routes')({app});


let server = app.listen(8888, function() {
    const host = server.address().address
    const port = server.address().port

    console.log("spotify thing webserver listening at http://%s:%s", host, port)
});
