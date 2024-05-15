import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '@/app/components/get/getUserFromSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const user_id = await getUserFromSession();

    if (!user_id) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const {title, description, size, type, image_url, project_id} = req.body; // Access feature data

    const newFeature = await prisma.feature.create({
      data: {
        title,
        description,
        size,
        type,
        image_url,
        project: {connect: {project_id}},
        user: {connect: {user_id}},
      },
    });

    res.status(201).json(newFeature);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}
