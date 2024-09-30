


import { Entity, CreateDateColumn, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    eventId: number;

    @ManyToOne(() => User, (user) => user.events)
    idUser: User;

    @Column()
    nomeEvento: string;

    @Column({ type: "varchar", length: 100 })
    descricao: string;

    @Column({ type: "date" })
    dataEvento: string;

    @Column({ type: "varchar" })
    hora: string;

    @Column({ type: "varchar", nullable: true })
    imagem: string;

    @Column()
    modalidade: string;

    @CreateDateColumn()
    dataPublicacao: string;
}