import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../get/getUserFromSession';

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {username, google_id} = req.body;
    const user_id = await getUserFromSession(req);

    const newUser = await prisma.user.create({
      data: {username, google_id, user_id}, // Add user_id to data
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(res, error);
  }
}
