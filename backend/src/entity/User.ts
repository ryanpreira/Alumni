
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Event } from "./Event"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    confirmarSenha: string;

    @Column()
    formacao: string;

    @Column({ type: 'json', nullable: true })
    tags: string[];

    @Column({ nullable: true })
    bio: string;

    @Column()
    ano: string;

    @Column()
    matriculaCPF: string;

    @Column()
    papel: string;

    @OneToMany(() => Post, (post) => post.idUser)
    posts: Post[];

    @OneToMany(() => Event, (events) => events.idUser)
    events: Event[];

    @Column({ nullable: true })
    file: string;
}