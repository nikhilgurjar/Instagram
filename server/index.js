const express = require('express');
const index = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('./models/user');
require('./models/post');
const PORT = 5000;
index.use(cors())
const {MONGOURI} = require('./Keys');
index.use(express.json())  //we have added this so that  all incoming requests are parsed and then sent to our routes so this should be before our routes
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected');
});

mongoose.connection.on('error',()=>{
    console.log('error connecting');
});

index.use(require('./Routes/auth'));
index.use(require('./Routes/Post'));
index.use(require('./Routes/user'));

index.listen(PORT,()=>{
    console.log('server is running',PORT);
})



