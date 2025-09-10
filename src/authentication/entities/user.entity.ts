import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ name: 'username', type: 'varchar', length: 64 })
    username: string;

    @Column({ name: 'password', type: 'varchar', length: 64 })
    password: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}