import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const {username, google_id} = req.body; // Access user data from request body

    const newUser = await prisma.user.create({
      data: {
        username,
        google_id,
      },
    });

    res.status(201).json(newUser); // Created (201) status with new user data
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}
