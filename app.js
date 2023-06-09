const express = require('express');
const app = express();
//set the template engine ejs
app.set('view engine', 'ejs');
//middlewares
app.use(express.static('public'));
//routes
app.get('/', (req, res) => {
    res.render('index');
});

server = app.listen(3000);

const io = require("socket.io")(server);
//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })
    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
})