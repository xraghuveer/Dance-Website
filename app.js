const express = require("express");
const path = require("path");
const fs = require("fs");
const { emit } = require("process");
const app = express();


//express specific nstuff
app.use('/static' , express.static('static')); // For serving static files
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine', 'pug');//Set the template engine
app.set('views', path.join(__dirname, 'views'))//Set the views directory
 
//PUG demo endpoint
app.get("/" , (req,res)=>{
    const con = "Alpha Karate"
    const params ={'title' : 'Puck puck' , "content":con}
    res.status(200).render('index.pug',params);
});


//start the server
app.listen(port,()=>{
    console.log(`App Started Successfully on port ${port}`)
});