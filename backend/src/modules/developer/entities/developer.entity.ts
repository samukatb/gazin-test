import { Level } from 'src/modules/level/entities/level.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SexType } from '../enums/sex.enum';

@Entity('developers')
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SexType,
  })
  sex: SexType;

  @Column()
  birthdate: Date;

  @Column()
  hobby: string;

  @Column()
  level_id: number;

  @ManyToOne(() => Level, (level) => level.developers)
  @JoinColumn({ name: 'level_id' })
  level: Level;

  get age(): number {
    const diffInMs = Date.now() - this.birthdate.getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
