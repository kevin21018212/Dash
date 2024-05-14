import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma'; // Adjust path as needed
import {getUserFromSession} from '../get/getUserFromSession';

export default async function createFeature(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {title, description, size, type, image_url, project_id} = req.body;
    const user_id = await getUserFromSession(req);

    const newFeature = await prisma.feature.create({
      data: {
        title,
        description,
        size,
        type,
        image_url,
        project: project_id?.connect({project_id}),
        user: {connect: {user_id}},
      },
    });

    res.status(200).json(newFeature);
  } catch (error) {
    console.log(res, error);
  }
}
