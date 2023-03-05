import { Exclude, Expose } from 'class-transformer';
import { Developer } from '../../../modules/developer/entities/developer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => Developer, (developer) => developer.level, { eager: true })
  developers: Developer[];

  @Expose({ name: 'total_developers' })
  totalDevelopers?(): number {
    return this.developers?.length;
  }
}
