import { prisma } from '../lib/prisma';
import { createUserProps } from '../services/auth.services';

const UserRepository = {
    findByEmail: async (email: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            return user;
        } catch (err) {
            console.log(err);
        }
    },
    findByUsername: async (username: string) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: username },
            });

            return user;
        } catch (err) {
            console.log(err);
        }
    },

    createUser: async (user: createUserProps) => {
        try {
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
        } catch (err) {
            console.log(err);
        }
    },
};

export default UserRepository;
