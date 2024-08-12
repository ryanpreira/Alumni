import { Router, Request, Response } from 'express';
import { User } from '../models/userModel';
import { AppDataSource } from '../app';
import * as yup from 'yup';

const router = Router();

const bodyValidation: yup.Schema<User> = yup.object().shape({
  id: yup.number().required().default(User.length + 1),
  nome: yup.string().required().min(3),
  email: yup.string().email().required(),
  senha: yup.string().required().min(6),
  acesso_tipo: yup.string().required(),
  data_registro: yup.date().required().default(() => new Date())
})

export const getUsers = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (user) {
      res.json(user);
  } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
  }

};

export const createUser = async (req: Request, res: Response) => {
  
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOneBy({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email já está em uso.' });
  }

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

  const newUser = userRepository.create(req.body);
  const resul = await userRepository.save(newUser);
  res.json(resul);
};

export const updateUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

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

  if (validatedData?.email && validatedData.email !== user.email) {
    const existingUser = await userRepository.findOneBy({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }
  }
    if (user) {
      userRepository.merge(user, req.body);
      const resul = await userRepository.save(user);
      res.json(resul);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado.' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });

  if (user) {
    await userRepository.delete({ id: parseInt(req.params.id) });
    res.status(200).json({ message: 'Usuário removido.' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
};

export default router;