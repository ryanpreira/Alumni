# :checkered_flag: Alumni.

A Plataforma Alumni da Universidade Federal do Ceará - Campus Quixadá tem como objetivo ser uma rede social de livre interação entre alunos e egressos da mesma instituição. Por meio do website, semelhante a abordagens como a da rede social LinkedIn, os estudantes da instituição poderão compartilhar o que desejar de suas vidas acadêmicas e demonstrar interesse em mentorias e oportunidades de estágio sinalizadas por Egressos.

## :technologist: Membros da equipe

- Antônio Diogo Monteiro Damascena - 511948<br/>
- Carlos Ryan Pereira Silva - 493471<br/>
- Gabriela Machado Santos - 538229<br/>
- João Pedro Moraes de Oliveira - 501105<br/>
- Vinicius Soares Lima - 538188

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Administradores<br/>
- Alunos<br/>
- Egressos<br/>
> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :spiral_calendar: Entidades ou tabelas do sistema

- Usuário<br/>
- Publicação<br/>
- Sinalização<br/>
- Comentário

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

- Cada usuário terá seu perfil, no qual ele poderá destacar informações sobre sua trajetória acadêmica e também áreas de interesse.<br/>
- Os usuários podem realizar públicações e interagir com outras públicações, podendo realizar comentários e demonstrar interesse naquela vaga de estágio apresentada na públicação.<br/>
- Para gerenciar tudo isso, o administrador do sistema poderá remover públicações de cunho ofensivo e gerir a plataforma, conforme necessário.<br/>
- Egresso poderá sinalizar disponibilidade para prestação de mentoria.<br/>
- Aluno poderá sinalizar interesse em mentoria de Egresso.<br/> 
Descreve ou liste brevemente as principais funcionalidades da aplicação que será desenvolvida. Destaque a funcionalidades que serão acessévies a todos os usuários e aquelas restriras a usuários logados.


----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Javascript
Typescript
HTML e CSS
Vue.JS

**Backend:**

Typescript
Sqlite
Multer
Express
Bcrypt

## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Post | X | X |  | X |
| User | X | X | x | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/users|
| GET | api/posts|
| GET | api/users/:id|
| GET | api/posts/:id|
| GET | api/logout|
| POST | api/login/|
| POST | api/users/|
| POST | api/posts/|
| PUT | api/users/:id|
| PUT | api/posts/:id|
| DELETE | api/users/:id|
| DELETE | api/posts/:id|
