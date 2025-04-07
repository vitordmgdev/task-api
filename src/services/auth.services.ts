import bcrypt from 'bcrypt';
import { AppError } from '../errors/app.error';
import UserRepository from '../repositories/user.repository';

export interface UserProps {
    username: string;
    firstname: string;
    lastname?: string | undefined;
    email: string;
    password: string;
}

type PromiseUserProps = {
    createdAt: Date;
    updatedAt: Date;
};

const AuthService = {
    createUser: async (user: UserProps): Promise<PromiseUserProps> => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userWithHashedPassword = { ...user, password: hashedPassword };

        const [existsEmail, existsUsername] = await Promise.all([
            UserRepository.findByEmail(user.email),
            UserRepository.findByUsername(user.username),
        ]);

        if (existsEmail) {
            throw new AppError('Este email já está cadastrado', 400);
        }

        if (existsUsername) {
            throw new AppError('Já possuí um usuário com este nome de usuário', 400);
        }

        const newUser = await UserRepository.createUser(userWithHashedPassword);

        if (!newUser) {
            throw new AppError('Houve algum erro ao tentar criar sua conta. Tente novamente mais tarde!', 500);
        }

        return newUser;
    },
};

export default AuthService;
