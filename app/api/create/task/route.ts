import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '@/app/components/get/getUserFromSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const user_id = await getUserFromSession(req);

    if (!user_id) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const {title, description, type, size, feature_id} = req.body; // Access task data

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        type,
        size,
        user: {connect: {user_id}},
        feature: {connect: {feature_id}},
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}
