import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

// Imports user entity.
import { UserEntity } from '../../authentication/entities/user.entity';

export enum Priority {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    URGENT = 4,
}

export enum Status {
    TODO = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    CANCELLED = 3,
}

@Entity('list')
export class ListEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ name: 'user_id', type: 'integer' })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Index()
    @Column({ name: 'title', type: 'text' })
    title: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description: string | null;

    @Index()
    @Column({ name: 'priority', type: 'integer', default: Priority.NONE})
    priority: Priority;

    @Index()
    @Column({ name: 'status', type: 'integer', default: Status.TODO})
    status: Status;

    @Index()
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}