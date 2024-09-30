
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId: number;

    @ManyToOne(() => User, (user) => user.posts)
    idUser: User;
    
    @Column()
    conteudo: string;

    @CreateDateColumn()
    data: string;
}