import { Request, Response } from 'express';
import { users, User } from '../models/userModel';
import * as yup from 'yup';

const bodyValidation: yup.Schema<User> = yup.object().shape({
  id: yup.number().required().default(users.length + 1),
  nome: yup.string().required().min(3),
  email: yup.string().email().required(),
  senha: yup.string().required().min(6),
  acesso_tipo: yup.string().required(),
  data_registro: yup.date().required().default(() => new Date())
})

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {

  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {

  let validatedData: User | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch(error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {}

    yupError.inner.forEach( error => {
      if(error.path === undefined) return;
      validationErrors[error.path] = error.message;
    })

    return res.status(404).json({
      errors: {
        default: validationErrors
      }
    });
  }

  const newUser: User = {
    id: users.length + 1,
    ...req.body,
    data_registro: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  
  const user = users.find(u => u.id === parseInt(req.params.id));

  let validatedData: User | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch(error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {}

    yupError.inner.forEach( error => {
      if(error.path === undefined) return;
      validationErrors[error.path] = error.message;
    })

    return res.status(404).json({
      errors: {
        default: validationErrors
      }
    });
  }

  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ 
      message: 'User not found' 
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({
      message: 'User not found'
    });
  }
};