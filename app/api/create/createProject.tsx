import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../get/getUserFromSession';

export default async function createProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {link, description, image_url} = req.body;
    const user_id = await getUserFromSession(req);

    const newProject = await prisma.project.create({
      data: {link, description, image_url, user: {connect: {user_id}}},
    });

    res.status(200).json(newProject);
  } catch (error) {
    console.log(res, error);
  }
}
