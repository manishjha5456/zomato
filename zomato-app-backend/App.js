const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Approuting = require('./routers/AppRouting');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',Approuting);

const PORT = 3040;
const MONGO_DB_URI = 'mongodb://127.0.0.1:27017/ZomatoDB';

mongoose.connect(MONGO_DB_URI).then(()=>{
    console.log('Database connected successfully...!!');
    app.listen(PORT,()=>{
        console.log(`your server is running on ::${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});