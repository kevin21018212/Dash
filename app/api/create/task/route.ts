import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../../api/get/getUserFromSession';
export default async function createTask(title, description, type, size, feature_id) {
  try {
    const user_id = await getUserFromSession();

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

    return newTask;
  } catch (error) {
    console.log(error);
  }
}
