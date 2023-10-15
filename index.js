require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server running successfully');
});

app.post('/streamtape-video-id', (req, res) => {
    const videoID = req.body.videoID;
    fetch(`https://api.streamtape.to/file/dlticket?file=${videoID}&login=${process.env.LOGIN}&key=${process.env.KEY}`)
    .then(response => response.json())
    .then(data => res.send(data));
});

app.post('/streamtape-ticket', (req, res) => {
    const videoID = req.body.videoID;
    const ticket = req.body.ticket;
    fetch(`https://api.streamtape.to/file/dl?file=${videoID}=${ticket}`)
    .then(response => response.json())
    .then(data => res.send(data));
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running successfully');
});