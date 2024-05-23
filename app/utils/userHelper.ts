import prisma from '@/prisma/prisma';
import {getServerSession} from 'next-auth';

/**
 * Finds a user by their Google ID (email).
 * @param {string} google_id - The Google ID (email) of the user.
 * @returns {Promise<object|null>} - The user object if found, otherwise null.
 */
export async function findUserByGoogleId(google_id: string) {
  try {
    let user = await prisma.user.findUnique({
      where: {google_id},
    });
    if (!user && google_id) {
      const session = await getServerSession();
      user = await prisma.user.create({
        data: {
          google_id: session?.user?.email as string,
          username: session?.user?.name as string,
        },
      });
    }

    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw new Error('Error finding user');
  }
}
