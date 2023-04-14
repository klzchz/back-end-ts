import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('products')
export class Product {

  @PrimaryColumn()
  id:string;
  @Column()
  name:string;
  @Column()
  description:string;
  @Column()
  weight:number;

}
