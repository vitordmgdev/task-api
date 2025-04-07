import { prisma } from '../lib/prisma';
import { UserProps } from '../services/auth.services';

const UserRepository = {
    findByEmail: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    },
    findByUsername: async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        return user;
    },
    createUser: async (user: UserProps) => {
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            },
        });
        return newUser;
    },
};

export default UserRepository;
