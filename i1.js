const express = require('express');
const app = express();

const courses = [
{id:1,name:'c1'},
{id:2,name:'c2'},
{id:3,name:'c3'}
];

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
})



app.listen(3000,()=>console.log('Listening on port 3000...'));
