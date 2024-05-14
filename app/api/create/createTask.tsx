import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../get/getUserFromSession';
export default async function createTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {title, description, type, size, feature_id} = req.body;
    const user_id = await getUserFromSession(req);

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        type,
        size,
        user: {connect: {user_id}}, // Link task to authenticated user
        feature: feature_id ? {connect: {feature_id}} : undefined, // Optional feature association
      },
    });

    res.status(200).json(newTask);
  } catch (error) {
    console.log(res, error);
  }
}
