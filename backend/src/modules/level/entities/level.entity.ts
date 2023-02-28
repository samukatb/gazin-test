import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
