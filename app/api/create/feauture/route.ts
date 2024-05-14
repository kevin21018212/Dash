import {prisma} from '@/prisma/prisma'; // Adjust path as needed
import {getUserFromSession} from '../../api/get/getUserFromSession';

export default async function createFeature(title, description, size, type, image_url, project_id) {
  try {
    const user_id = await getUserFromSession();

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

    return newFeature;
  } catch (error) {
    console.log(error);
  }
}
