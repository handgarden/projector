import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OAuthProvider } from './OAuthProvider';
import { User } from '../../user/domain/User.entity';
import { Nil } from '../../common/nil/Nil';

@Entity({
  name: 'oauth_profile',
})
export class OAuthProfile {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 255,
  })
  id: string;

  @PrimaryColumn({ name: 'provider', type: 'simple-enum', enum: OAuthProvider })
  provider: OAuthProvider;

  @Column({ name: 'username', type: 'varchar', length: 255 })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @ManyToOne(() => User, (user) => user.oauthProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  static create({
    userId,
    id,
    provider,
    name,
    email,
  }: {
    userId: number;
    id: string;
    provider: OAuthProvider;
    name: string;
    email: Nil<string>;
  }) {
    const profile = new OAuthProfile();
    profile.id = id;
    profile.provider = provider;
    profile.username = name;
    profile.email = email.isNotNil() ? email.unwrap() : null;
    profile.userId = userId;

    return profile;
  }
}
