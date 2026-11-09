const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const app = express();

const port = 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost:27017/Students')

const db = mongoose.connection;

db.once('open',()=> {

    console.log('Database Connected Successfully');

}) 

const userSchema = new mongoose.Schema({
    studentname: String,
     birthdate: String,
    fathername: String,
    mothername: String,
    division: String,
    district: String,
    address: String,
    phone: Number,
    religion: String,
    nationality: String,
    
    email: String,

})

const User = mongoose.model('data ', userSchema); 

app.get('/home', (req,res) => {

    res.sendFile(path.join(__dirname, 'index.html') )


} )


app.post('/post',async(req,res) => {

const user = new User ({
    studentname: req.body['student-name'],
     birthdate: req.body['birth-date'],
    fathername: req.body['father-name'],
    mothername: req.body['mother-name'],
    division: req.body.division,
    district: req.body.district,
    address: req.body.address,
    phone: req.body.phone,
    religion: req.body.religion,
    nationality: req.body.nationality,
    
    email: req.body.email,



})

await user.save()

console.log(user)

res.send("Form Submitted Successfully")

}) 

app.listen(port,()=> {

    console.log(`Server Is Running At Port ${port}`);


})