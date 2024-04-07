import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account', type: 'varchar', length: 255, unique: true })
  account: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;
}
