import AppDataSource from "@/database/data-source";
import {CreateProductDTO, UpdateProductDTO} from "@/dto/create.product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";
import { Request,Response } from "express";
import { validate } from "class-validator";

export class ProductRepository {
  private repository:Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async getAll():Promise<Product[]>{
    return await this.repository.find()
  }

  async create(input: CreateProductDTO):Promise<Product> {
    const product = new Product;

    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;

    return await this.repository.save(product);

  }
    find = async(id:string):Promise<any|null>=>{
      return await this.repository.findOneBy({id});
    }

    delete = async(id:string)=>{
      return await this.repository.delete(id);
    }

    async update(input: UpdateProductDTO): Promise<Product|null> {
      const product = await this.find(input.id)
      if (!product) {
        return null
      }

      product.name = input.name
      product.description = input.description
      product.weight = input.weight

      return await this.repository.save(product)
    }

}
