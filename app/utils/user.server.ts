import bcrypt from "bcryptjs";

import { prisma } from "./prisma.server";
import type { RegisterForm } from "./types.server";

export const createUser = async (user: RegisterForm) => {
  const { email, password, firstName, lastName } = user;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      profile: {
        firstName,
        lastName,
      },
    },
  });

  return { id: newUser.id, email: user.email };
};

export const getOtherUsers = async (userId: string) => prisma.user.findMany({
  where: {
    id: {
      not: userId,
    },
  },
  orderBy: {
    profile: {
      firstName: "asc",
    }
  }
});
