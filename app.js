const express = require('express');
const app = express();
const server= require('http').Server(app);
const {v4: uuidv4} = require('uuid');
const io= require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug:true
});


//view engine 
app.set("view engine", "ejs");

//static files 
app.use(express.static(__dirname + "/public"));

//peer
app.use('/peerjs', peerServer);

//routes
app.get('/' , (req,res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req,res) => {
    res.render('room' , { roomId : req.params.room})
});

io.on('connection' , socket => {
    socket.on('join-room' , (roomId, userId) =>{
        console.log('joined the room');
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);       
    })
})





server.listen(3000);
console.log('listening to port 3000');
