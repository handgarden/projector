import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account', type: 'varchar', length: 50, unique: true })
  account: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 50 })
  password: string;
}
