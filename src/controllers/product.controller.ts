import {Response,Request, response} from 'express';

class ProductController
{

   findAll = (request:Request,response:Response)=>{

      return  response.status(200).send({
        data:[

        ]
      })
  }

}

export default new ProductController;
