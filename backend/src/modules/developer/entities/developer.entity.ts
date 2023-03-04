import { Exclude, Expose } from 'class-transformer';
import { Level } from '../../../../src/modules/level/entities/level.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SexType } from '../../../modules/developer/enums/sex.enum';

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

  @Exclude()
  @Column()
  level_id: number;

  @ManyToOne(() => Level, (level) => level.developers)
  @JoinColumn({ name: 'level_id' })
  level?: Level;

  @Expose({ name: 'age' })
  getAge?(): number {
    const today = new Date();
    const birthDate = new Date(this.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
