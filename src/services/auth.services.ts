import UserRepository from '../repositories/user.repository';
import bcrypt from "bcrypt"

interface validateUniqueUserCredentialsProps {
    username: string;
    email: string;
}

export interface createUserProps {
    username: string,
    firstname: string,
    lastname: string | undefined,
    email: string,
    password: string
}

const AuthService = {
    validateUniqueUserCredentials: async ({
        username,
        email,
    }: validateUniqueUserCredentialsProps): Promise<void | false> => {
        try {
            const existsEmail = await UserRepository
            .findByEmail(email);

            const existsUsername = await UserRepository
            .findByUsername(username);

            if(existsEmail) {
                throw new Error('Este email já existe');
            }

            if(existsUsername) {
                throw new Error('Este nome de usuário já existe')
            }

            return false;
        } catch(err){
            console.log(err);
        }
    },
    createUser: async({
        username,
        firstname,
        lastname,
        email,
        password
    }:createUserProps) => {
        const user = {
            username,
            firstname,
            lastname,
            email,
            password
        }
        user.password = bcrypt.hashSync(password, 10);
        const newUser = await UserRepository.createUser(user)
        .then(newUser => {
            if(newUser){
                return newUser
            }
        });

        if(!newUser) {
            throw new Error('Houve algum erro na criação da sua conta. Tente mais tarde!')
        }
    }
};

export default AuthService;
