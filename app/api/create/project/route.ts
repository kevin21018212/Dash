import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '@/app/components/get/getUserFromSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const user_id = await getUserFromSession(); // Call getUserFromSession

    if (!user_id) {
      return res.status(401).json({error: 'Unauthorized'});
    }

    const {link, description, image_url} = req.body; // Access project data

    const newProject = await prisma.project.create({
      data: {
        link,
        description,
        image_url,
        user: {connect: {user_id}}, // Use user.id for connection
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}
