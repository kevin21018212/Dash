import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../../api/get/getUserFromSession';

export default async function createUser(username, google_id) {
  try {
    const user_id = 1;

    const newUser = await prisma.user.create({
      data: {username, google_id, user_id}, // Add user_id to data
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
