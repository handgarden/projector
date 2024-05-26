import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../BaseTimeEntity';
import { OAuthProfile } from './OAuthProfile.entity';
import { CustomForbiddenError } from '../../../../common/filter/error/CustomForbiddenError';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account', type: 'varchar', length: 255, unique: true })
  account: string;

  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => OAuthProfile, (oauthProfile) => oauthProfile.user, {
    lazy: true,
    cascade: false,
  })
  oauthProfile: Promise<OAuthProfile[]>;

  confirmUserId(id: number) {
    if (this.id !== id) {
      throw new CustomForbiddenError();
    }
  }
}
