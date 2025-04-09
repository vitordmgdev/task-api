import bcrypt from 'bcrypt';
import { AppError } from '../errors/app.error';
import UserRepository from '../repositories/user.repository';
import jwt from "jsonwebtoken";

export interface UserProps {
    username: string;
    firstname: string;
    lastname?: string | undefined;
    email: string;
    password: string;
}

type PromiseUserType = {
    id: string;
    username: string;
    firstname: string;
    lastname: string | null;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const AuthService = {
    createUser: async (user: UserProps): Promise<PromiseUserType> => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userWithHashedPassword = { ...user, password: hashedPassword };

        const [existsEmail, existsUsername] = await Promise.all([
            UserRepository.findByEmail(user.email),
            UserRepository.findByUsername(user.username),
        ]);

        if (existsUsername) {
            throw new AppError(
                'Já existe um usuário com este nome de usuário!',
                400,
            );
        }

        if (existsEmail) {
            throw new AppError('Este email já está cadastrado!', 400);
        }

        const newUser = await UserRepository.createUser(userWithHashedPassword);

        return newUser;
    },
    login: async (email: string, password: string) => {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Não existe usuário cadastrado com este email!', 400);
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
            throw new AppError('As senhas não correspondem!', 400);
        }

        const token = jwt.sign({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
        }, process.env.TOKEN_KEY!, { expiresIn: '1h' });

        return token;
    },
};

export default AuthService;
