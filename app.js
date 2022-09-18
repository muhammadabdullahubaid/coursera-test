const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const port = 8000;

//Define Mongoose Schema
const contactDance = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    email_id: String,
    address: String,
    more: String
  });
const contact = mongoose.model('Contact', contactDance);
// EXPRESS SPECIFIC STUFF
app.use('/static' , express.static('static'));// for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');//set the template engine as pug
app.set('views', path.join(__dirname, 'views'));//set the views directory

// ENDPOINTS
app.get('/' , (req,res) => {
    const params ={};
    res.status(200).render('home.pug', params)
})
app.get('/contact' , (req,res) => {
    const params ={};
    res.status(200).render('contact.pug', params)
})

app.post('/contact' , (req,res) => {
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database")
    // alert("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not send to the databases")
    })
    // res.status(200).render('contact.pug')

})
app.get('/about' , (req,res) => {
    const params ={};
    res.status(200).render('about.pug', params);
})
app.get('/services' , (req,res) => {
    const params ={};
    res.status(200).render('services.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`);
})
