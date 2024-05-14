import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/prisma/prisma';
import {getUserFromSession} from '../../api/get/getUserFromSession';

export default async function createProject(link, description, image_url) {
  try {
    const user_id = await getUserFromSession();

    const newProject = await prisma.project.create({
      data: {link, description, image_url, user: {connect: {user_id}}},
    });

    return newProject;
  } catch (error) {
    console.log(error);
  }
}
