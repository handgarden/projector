import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OAuthProvider } from '../../core/entity/enum/OAuthProvider';
import { User } from '../../user/domain/User.entity';
import { OAuthProfileDto } from '../../lib/auth/oauth/dto/OAuthProfile';

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

  static fromDto(userId: number, dto: OAuthProfileDto) {
    const profile = new OAuthProfile();
    profile.id = dto.id;
    profile.provider = dto.provider;
    profile.username = dto.name;
    profile.email = dto.email.isNotNil() ? dto.email.unwrap() : null;
    profile.userId = userId;

    return profile;
  }
}
