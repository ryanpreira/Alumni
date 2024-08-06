export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  acesso_tipo: string;
  data_registro: Date;
}

export const users: User[] = [
  { id: 1, nome: 'Charlotte Emma Aitchison', email: 'charlixcx@gmail.com', senha: 'uguess', acesso_tipo: 'admin', data_registro: new Date() },
  { id: 2, nome: 'James Thomas Smith', email: 'jamiexx@gmail.com', senha: 'inwaves', acesso_tipo: 'graduate_student', data_registro: new Date() }
];