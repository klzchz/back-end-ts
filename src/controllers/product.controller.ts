import {Response,Request, response} from 'express';
import { Product } from '@/entities/product.entity';
import AppDataSource from '@/database/data-source';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { ProductRepository } from '@/repositories/product.repository';
import {CreateProductDTO} from '@/dto/create.product.dto';


class ProductController
{
  private productRepository:Repository<Product>;
  protected product:Product;
  private repository:ProductRepository;
  private dtoCreate:CreateProductDTO;

  constructor(productCreateDto:CreateProductDTO ,repository: ProductRepository){
    this.productRepository = AppDataSource.getRepository(Product);
    this.repository = repository;
    this.dtoCreate =productCreateDto;
  }

   findAll = async (request:Request,response:Response):Promise<Response> =>{

      const products = await this.repository.getAll();
      return  response.status(200).send({
        data:products
      })
  }

  create = async (request:Request,response:Response):Promise<Response> =>{

      const {name,description,weight} = request.body;

      this.dtoCreate.name = name ;
      this.dtoCreate.description = description ;
      this.dtoCreate.weight = weight ;

      const errors = await validate(this.dtoCreate)
      if(errors.length > 0) {
        return response.status(422).send({
          errors
        })
      }

      const productDb = await this.repository.create(this.dtoCreate);

      return response.status(201).send({
        data:productDb
      });

  }


  findOne = async (request:Request,response:Response):Promise<Response>=>{
    const id: string = request.params.id;

    const product = await this.repository.find(id);

    if (!product) {
      return response.status(404).send({
        error: 'Product not found'
      });
    }


    return response.status(200).send({
      data: product
    })
  }


  update = async(request:Request, response:Response):Promise<Response>=>{
    const {name,description,weight} = request.body;
    const id: string = request.params.id;

    try {
      const product = await this.productRepository.findOneByOrFail({ id });
      product.name = name;
      product.description = description;
      product.weight = weight;


      const errors = await validate(product)
      if(errors.length > 0) {
        return response.status(422).send({
          errors
        })
      }


      const productDb = await this.productRepository.save(product);

      return response.status(200).send({
        data: productDb
      })

    } catch (error) {
      return response.status(200).send({
        error: error
      })

    }

  }

  delete = async (request:Request,response:Response):Promise<Response> =>{
    const id: string = request.params.id;
    try {
      await this.repository.delete(id);
      return response.status(204).send({});

    } catch (error) {
      return response.status(400).send({
        error: 'Error Deleting'
      })

    }
  }

}




export default new ProductController(new CreateProductDTO,new ProductRepository);
