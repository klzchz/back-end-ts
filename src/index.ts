import dotenv from 'dotenv';
import express, { response } from 'express';

dotenv.config()

import './data-source';

const PORT = process.env.port || 8080;

const app = express();

app.get('/',(req,res)=>{

  res.send("Server Up");

});

app.listen(PORT,()=>{
  console.log(`Server Runing  in port ${PORT}`);
});

