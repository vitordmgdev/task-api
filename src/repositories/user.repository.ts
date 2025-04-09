/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../lib/prisma';
import { UserProps } from '../services/auth.services';

const UserRepository = {
    findByEmail: async (email: string) => {
        return prisma.user.findUnique({ where: { email: email }, });
    },
    findByUsername: async (username: string) => {
        return prisma.user.findUnique({ where: { username: username }, });
    },
    createUser: async (user: UserProps) => {
        return prisma.user.create({
            data: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
            },
        });
    },
};

export default UserRepository;
