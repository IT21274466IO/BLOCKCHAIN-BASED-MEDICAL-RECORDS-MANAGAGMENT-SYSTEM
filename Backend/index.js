
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var mainRoutes = require('./routes/Main')
var fileRoutes = require('./routes/file')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'*'}))

let port = process.env.PORT || 4000;
app.listen(port,()=>console.log('Server started at : 4000'))

app.get('/', (req, res) => {
    res
    .status(200)
    .send('Hello server is running')
    .end();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});

app.use('/file',fileRoutes)
app.use('/main',mainRoutes)