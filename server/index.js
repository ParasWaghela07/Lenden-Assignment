import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import dbconnect from './config/database.js';

const app=express();
const PORT=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

dbconnect();
app.listen(PORT,()=>{
    console.log(`SERVER IS LIVE AT PORT ${PORT}`);
})