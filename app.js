const express = require('express');
const app = express();
const server= require('http').Server(app);
const {v4: uuidv4} = require('uuid');


//view engine 
app.set("view engine", "ejs");

//static files 
app.use(express.static(__dirname + "/public"));



//routes
app.get('/' , (req,res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req,res) => {
    res.render('room' , { roomId : req.params.room})
});






server.listen(3000);
console.log('listening to port 3000');
