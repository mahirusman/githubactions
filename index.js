const express=require('express');

const mongoose=require('mongoose');

const app=express();


mongoose.connect('mongodb://localhost:27017/practise');

const db=mongoose.connection

// Event handlers for Mongoose connection events
db.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

app.get('/',(req,res)=>{
    res.send('ok')
})


app.listen(4000,()=>{
    console.log('server is started at 4000')
})