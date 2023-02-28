import { Developer } from 'src/modules/developer/entities/developer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Developer, (developer) => developer.level)
  developers: Developer[];
}
