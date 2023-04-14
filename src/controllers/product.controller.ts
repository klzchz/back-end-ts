import {Response,Request, response} from 'express';
import { Product } from '../entities/product.entity';
import AppDataSource from '../data-source';
import { Repository } from 'typeorm';


class ProductController
{
  private productRepository:Repository<Product>;
  protected product:Product;

  constructor(product: Product){
    this.productRepository = AppDataSource.getRepository(Product);
    this.product = product;
  }

   findAll = async (request:Request,response:Response):Promise<Response> =>{

      const products = await this.productRepository.find();
      return  response.status(200).send({
        data:products
      })
  }

  create = async (request:Request,response:Response):Promise<Response> =>{
      this.product.name = 'Product 122';
      this.product.weight = 80;
      this.product.description = 'desc prsod';

      const productDb = await this.productRepository.save(this.product);

      return response.status(201).send({
        data:productDb
      });

  }

}


export default new ProductController(new Product);
