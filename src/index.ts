import dotenv from 'dotenv';
import express, { response } from 'express';
const bodyParser = require('body-parser');
dotenv.config()

import './data-source';
import productController from './controllers/product.controller';

const PORT = process.env.PORT || 8080

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/products',productController.create);

app.get('/api/products',productController.findAll);

app.get('/',(req,res)=>{

  res.send("Server Up");

});

app.listen(PORT,()=>{
  console.log(`Server Runing  in port ${PORT}`);
});

