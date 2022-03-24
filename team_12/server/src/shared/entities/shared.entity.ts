import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity<EntityDTO extends object> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  abstract getDTO(): EntityDTO;
}
