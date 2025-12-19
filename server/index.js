import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import dbconnect from './config/database.js';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);

dbconnect();

app.listen(PORT,()=>{
    console.log(`SERVER IS LIVE AT PORT ${PORT}`);
})