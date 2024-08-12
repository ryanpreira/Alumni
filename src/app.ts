import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata";
import routes from './routes/userRoutes';
import { DataSource } from 'typeorm';
import { User } from './models/userModel';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/labs.db",
    synchronize: true,
    logging: false,
    entities: [User],
});

AppDataSource.initialize()
  .then(() => {

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    app.use('/', routes);

    app.use((req: Request, res: Response) => {
      res.send(`
        <html>
          <head><title>Projeto Final</title></head>
          <body>
            <h1>Descrição do Projeto Final</h1>
            <p>A Plataforma Alumni da Universidade Federal do Ceará - Campus Quixadá tem como objetivo<br/> 
            ser uma rede social de livre interação entre alunos e egressos da mesma instituição.<br/> 
            Por meio do website, semelhante a abordagens como a da rede social LinkedIn, os estudantes da<br/> 
            instituição poderão compartilhar o que desejar de suas vidas acadêmicas e demonstrar interesse e<br/> 
            m mentorias e oportunidades de estágio sinalizadas por Egressos.</p>
            <h2>Autores:</h2>
            <ul>
              <li>Antônio Diogo Monteiro Damascena - 511948</li>
              <li>Carlos Ryan Pereira Silva - 493471</li>
              <li>Gabriela Machado Santos - 538229</li>
              <li>João Pedro Moraes de Oliveira - 501105</li>
              <li>Vinicius Soares Lima - 538188</li>
            </ul>
          </body>
        </html>
      `);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });