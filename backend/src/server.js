//const express = require('express');
import express from "express";
import dotenv from "dotenv"
dotenv.config();
const app = express();
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'


const PORT = process.env.PORT || 3000;


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)



app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT);
});