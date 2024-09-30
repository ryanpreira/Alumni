import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from './entity/User'
import { Post } from "./entity/Post";
import { Event } from "./entity/Event";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/labs.db",
    synchronize: true,
    logging: false,
    entities: [User, Post, Event],
});
