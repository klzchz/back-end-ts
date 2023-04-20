import 'module-alias/register';
import dotenv from 'dotenv';
import express, { response } from 'express';


const bodyParser = require('body-parser');
dotenv.config()

import '@/database/data-source';
import ProductController from '@/controllers/product.controller';
import routes from '@/routes';
import cors from 'cors';



const PORT = process.env.PORT || 8080

const app = express();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)




app.listen(PORT,()=>{
  console.log(`Server Runing  in port ${PORT}`);
});

