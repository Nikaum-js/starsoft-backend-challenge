import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of the user' })
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Column()
  @MinLength(6)
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
