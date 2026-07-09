require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const authRouter=require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes');

const app=express();

//allow front end to connect
app.use(cors({
  origin: [
    'http://localhost:3000',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/contacts', contactRoutes);
//connecting with mongoDB
mongoose.connect(process.env.MONGODB_URI).
then(()=>console.log('mongoDB is connected'))
.catch((err)=>console.log('mongoDB is not connected',err)
);
app.get('/api/test',(req,res)=>{
  res.send('backend is working');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`server is running ${PORT}`);
  
})