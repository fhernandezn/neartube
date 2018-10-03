const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.static('public/dist'));
app.use('/videos', express.static('public/videos'));

app.use(bodyParser.json());

// init API
const routes = require('./routes')();
app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/neartube', (err) => {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        require('./seed')(mongoose);

        const http = require('http').Server(app);
        const io = require('socket.io')(http);

        require('./sockets')(io);

        http.listen(PORT, () => {
            console.log('NearTube running');
        });
    }
});