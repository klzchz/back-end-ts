import {Response,Request, response} from 'express';
import AppDataSource from '@/database/data-source';
import { validate } from 'class-validator';
import { ProductRepository } from '@/repositories/product.repository';
import {CreateProductDTO,UpdateProductDTO} from '@/dto/create.product.dto';


class ProductController
{
  private repository:ProductRepository;
  private dtoCreate:CreateProductDTO;

  constructor(productCreateDto:CreateProductDTO ,repository: ProductRepository){
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



  update = async(request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id
    const {name, description, weight} = request.body

    const updateDto = new UpdateProductDTO
    updateDto.id = id
    updateDto.name = name
    updateDto.description = description
    updateDto.weight = weight

    const errors = await validate(updateDto)
    if (errors.length > 0) {
      return response.status(422).send({
        errors
      })
    }

    try {
      const productDb = await this.repository.update(updateDto)
      if (!productDb) {
        return response.status(404).send({
          error: 'Product Not Found'
        })
      }
      return response.status(200).send({
        data: productDb
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal error'
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
